const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        users: [User!]
        user(id: ID!): User        
        me: User
    }

    extend type Mutation {
        deleteUser(id: ID!): Boolean!

        signUp (
            username: String!
            email: String!
            password: String!
        ): Token!

        signIn(login: String!, password: String!): Token!
    }

    type User {
        id: ID!
        username: String!
        email: String!
        firstName: String!
        lastName: String!
        role: String
        messages: [Message!]
    }

    type Token {
        token: String!
    }

`

module.exports = schema