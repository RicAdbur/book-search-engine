import { gql } from "@apollo/client"

export const LOG_IN = gql`
mutation LOG_IN($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      email
      username
    }
  }
}
`

export const ADD_USER = gql`
mutation ADD_USER($email: String, $password: String, $username: String) {
  addUser(email: $email, password: $password, username: $username) {
    token
    user {
      _id
      email
      password
      username
    }
  }
}
`

export const SAVE_BOOK = gql`
mutation Save_Book($bookData: BookInput) {
  saveBook(bookData: $bookData) {
    _id
    username
    email
    password
    savedBooks {
      _id
      authors
      bookId
      description
      image
      link
      title
    }
  }
}
`

export const REMOVE_BOOK = gql`
mutation RemoveBook($bookId: ID) {
  removeBook(bookId: $bookId) {
    _id
    username
    email
    password
    savedBooks {
      _id
      authors
      bookId
      description
      image
      link
      title
    }
  }
}
`