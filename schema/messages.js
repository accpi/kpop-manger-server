const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        messages: [Message!]!
        message(id: ID!): Message
    }

    extend type Mutation {
        createMessage(text: String!) : Message!
        updateMessage(id: ID!, text: String!): Message
        deleteMessage(id: ID!): Boolean!
    }
    
    type Message {
        id: ID!
        text: String!
        createdAt: Date!
        updatedAt: Date!
        user: User!
    }
`

module.exports = schema