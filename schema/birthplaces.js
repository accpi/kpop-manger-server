const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        birthplaces: [Birthplace!]!
        birthplace(id: ID!): Birthplace
    }

    extend type Mutation {
        createBirthplace(artistId: ID!, name: String!) : Birthplace!
        updateBirthplace(id: ID!, Country: String!, City: String!): Birthplace
        deleteBirthplace(id: ID!): Boolean!
    }
    
    type Birthplace {
        id: ID!
        Country: String!
        City: String!
        createdAt: Date!
        updatedAt: Date!
    }
`

module.exports = schema