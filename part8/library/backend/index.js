// import { ApolloServer } from "apollo-server";
const { ApolloServer, UserInputError, gql } = require("apollo-server");
const mongoose = require("mongoose");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

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
    addBook: async (root, args) => {
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
    editAuthor: async (root, args) => {
      // const author = authors.find((each) => each.name === args.name);
      const author = await Author.findOne({ name: args.name });
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
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
server.listen().then(({ url }) => {
  console.log(`server ready at ${url}`);
});
