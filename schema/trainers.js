const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        trainers: [Trainer]
        trainer(id: ID!): Trainer
    }

    extend type Mutation {
        createTrainer(
            first_name: String!, 
            last_name: String!, 
            dance: Int!, 
            vocals: Int!, 
            visuals: Int!, 
            personality: Int!
        ): Trainer!
        
        updateTrainer(
            first_name: String!, 
            last_name: String!, 
            dance: Int!, 
            vocals: Int!, 
            visuals: Int!, 
            personality: Int!
        ): Trainer!
        
        deleteTrainer(
            id: ID!
        ): Trainer!
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