const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        groups: [Group]
        group(id: ID!): Group
    }

    extend type Mutation {
        createGroup(name: String!, fanName: String!): Group
        updateGroup(id: ID!, name: String!, fanName: String!): Group
        deleteGroup(id: ID!): Group
    }
    
    type Group {
        id: ID!
        name: String!
        fan_name: String!
        fans: Int
        popularity: Int
        albums: [Album]
        artists: [Artist]
        user: User!
    }
`

module.exports = schema