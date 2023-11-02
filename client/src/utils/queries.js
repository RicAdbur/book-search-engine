import { gql } from "@apollo/client"

export const GET_ME = gql`
query GET_ME {
  me {
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