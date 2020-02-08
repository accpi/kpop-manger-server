const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        users: [User!]
        user(id: ID!): User        
        me: User
    }

    extend type Mutation {
        createUser (
            username: String!
            email: String!
            password: String!
            first_name: String!
            last_name: String!
            role: String!
        ): Token!

        updateUser (
            username: String!
            email: String!
            password: String!
            first_name: String!
            last_name: String!
            role: String!
        ): Token!

        deleteUser(username: String!): User

        loginUser(email: String!, password: String!): Token!
    }

    type User {
        id: ID!
        username: String!
        email: String!
        first_name: String!
        last_name: String!
        role: String!
        visuals: Visuals
        vocals: Vocals
        personality: Personality
        dance: Dance
        intangibles: Intangibles
        artists: [Artist]
        groups: [Group]
        trainers: [Trainers]
    }

    type Token {
        token: String!
    }
`

module.exports = schema