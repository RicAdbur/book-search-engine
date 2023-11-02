const typeDefs = `
  type Book {
    _id: ID
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(email: String, password: String, username: String): Auth
    saveBook(bookData: BookInput): User
    removeBook(bookId: ID): User
  }

  input BookInput {
    authors: [String]
    description: String
    bookId: ID
    image: String
    link: String
    title: String
  }

  type Auth {
    token: ID
    user: User
  }
`

module.exports = typeDefs