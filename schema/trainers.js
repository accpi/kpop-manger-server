const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        trainers: [Trainer!]!
        trainer(id: ID!): Trainer
    }

    extend type Mutation {
        createTrainer(firstName: String!, lastName: String!, dance: Int!, vocals: Int!, visuals: Int!, personality!): Trainer!
        updateTrainer(id: ID!, firstName: String!, lastName: String!, dance: Int!, vocals: Int!, visuals: Int!, personality!): Trainer
        deleteTrainer(id: ID!): Boolean!
    }
    
    type Trainer {
        id: ID!
        first_name: String!
        last_name: String!
        dance: Int!
        vocals: Int!
        visuals: Int!
        personality: Int!
        user: User!
    }
`

module.exports = schema