require("dotenv").config();
const {
  ApolloServer,
  UserInputError,
  gql,
  AuthenticationError,
} = require("apollo-server");
const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = "NEED_HERE_A_SECRET_KEY";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

console.log("connecting to:", MONGODB_URI);

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, born: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;
const resolvers = {
  Query: {
    authorCount: async () => {
      const authors = await Author.find({});
      return authors.length;
    },
    bookCount: async () => {
      const books = await Book.find({});
      return books.length;
    },
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({});
      }
      if (args.author) {
        // const authorBooks = books.filter((each) => each.author === args.author);
        const author = await Author.findOne({ name: args.author });
        return Book.find({ author: author._id });
      }
      if (args.genre) {
        // let booksByGenre = [];
        let booksByGenre = await Book.find({ genres: { $in: [args.genre] } });
        // for (let i = 0; i < books.length; i++) {
        //   for (let j = 0; j < books[i].genres.length; j++) {
        //     if (books[i].genres[j] === args.genre) {
        //       booksByGenre.push(books[i]);
        //     }
        //   }
        // }
        return booksByGenre;
      }
    },
    allAuthors: () => {
      return Author.find({});
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => {
      let authorBooks = await Book.find({ author: root.id });
      return authorBooks.length;
    },
  },
  Book: {
    author: async (root) => {
      try {
        const auth = await Author.findOne({ _id: root.author });
        return auth;
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticate");
      }
      let author = await Author.findOne({ name: args.author });
      if (!author) {
        author = new Author({
          name: args.author,
        });
      }
      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author,
      });
      try {
        await author.save();
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return book;
    },
    editAuthor: async (root, args, context) => {
      // const author = authors.find((each) => each.name === args.name);
      const author = await Author.findOne({ name: args.name });
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }
      if (!author) {
        return null;
      }
      author.born = args.born;
      // const updatedAuthor = { ...author, born: args.born };
      // authors = authors.map((each) =>
      //   each.name !== args.name ? each : updatedAuthor
      // );
      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return author;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials");
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});
server.listen().then(({ url }) => {
  console.log(`server ready at ${url}`);
});
