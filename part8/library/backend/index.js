// import { ApolloServer } from "apollo-server";
const { ApolloServer, gql } = require("apollo-server");
const { v1: uuid } = require("uuid");

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];
let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

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
    author: String!
    id: ID!
    genres: [String!]!
  }
  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;
const resolvers = {
  Query: {
    authorCount: () => authors.length,
    bookCount: () => books.length,
    allBooks: (root, args) => {
      if (!args.author && !args.genre) {
        return books;
      }
      if (args.author) {
        const authorBooks = books.filter((each) => each.author === args.author);
        return authorBooks;
      }
      if (args.genre) {
        // NOT WORKING SOLUTION
        // let booksByGenre = books.forEach((book) =>
        //   book.genres.filter((genre) => genre === args.genre)
        // );
        // WORKING SOLUTION:
        let booksByGenre = [];
        for (let i = 0; i < books.length; i++) {
          for (let j = 0; j < books[i].genres.length; j++) {
            if (books[i].genres[j] === args.genre) {
              booksByGenre.push(books[i]);
            }
          }
        }
        return booksByGenre;
      }
    },
    allAuthors: () => authors,
  },
  Author: {
    bookCount: (root) => {
      let authorBooks = books.filter((each) => each.author === root.name);
      return authorBooks.length;
    },
  },
  Mutation: {
    addBook: (root, args) => {
      const book = { ...args, id: uuid() };
      // console.log(book);
      const auth = authors.find((author) => author.name === book.author);
      if (!auth) {
        const author = { name: book.author, id: uuid(), born: null };
        // console.log(author);
        authors.push(author);
      }
      books.push(book);
      return book;
    },
    editAuthor: (root, args) => {
      const author = authors.find((each) => each.name === args.name);
      const updatedAuthor = { ...author, born: args.setBornTo };
      return updatedAuthor;
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
