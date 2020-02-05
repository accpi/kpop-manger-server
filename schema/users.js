const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        users: [User!]
        user(id: ID!): User        
        me: User
    }

    extend type Mutation {
        postUser (
            username: String!
            email: String!
            password: String!
            firstName: String!
            lastName: String!
        ): Token!

        updateUser (
            username: String!
            email: String!
            password: String!
            firstName: String!
            lastName: String!
        ): Token!

        deleteUser(username: String!): User

        loginUser(email: String!, password: String!): Token!
    }

    type User {
        id: ID!
        username: String!
        email: String!
        firstName: String!
        lastName: String!
        role: String
    }

    type Token {
        token: String!
    }

`

module.exports = schema