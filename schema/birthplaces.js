const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        birthplaces: [Birthplace]
        birthplace(id: ID!): Birthplace
    }

    extend type Mutation {
        createBirthplace( 
            country: String!, 
            city: String!
        ): Birthplace!

        updateBirthplace(
            id: ID!, 
            country: String!, 
            city: String!
        ): Birthplace!

        deleteBirthplace(
            id: ID!
        ): Birthplace!
    }
    
    type Birthplace {
        id: ID!
        country: String!
        city: String!
    }
`

module.exports = schema