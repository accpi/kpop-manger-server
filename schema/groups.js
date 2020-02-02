const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        groups: [Group!]!
        group(id: ID!): Group
    }

    extend type Mutation {
        createGroup(name: String!, fanName: String!) : Group!
        updateGroup(id: ID!, name: String!, fanName: String!): Group
        deleteGroup(id: ID!): Boolean!
    }
    
    type Group {
        id: ID!
        name: String!
        fanName: String!
        albums: [Album]
        artists: [Artist]
        user: User!
        createdAt: Date!
        updatedAt: Date!
    }
`

module.exports = schema