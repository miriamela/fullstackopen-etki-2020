import { gql } from "@apollo/client";
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`;
export const RECOMMENDED_BOOKS = gql`
  query recommended($genre: String!) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
      id
    }
  }
`;
export const CREATE_BOOK = gql`
  mutation createNewBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;
export const ADD_BIRTH_YEAR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born) {
      name
      born
    }
  }
`;
export const LOG_IN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
export const USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
      }
      genres
      id
    }
  }
`;
