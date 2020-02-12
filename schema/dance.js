const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        dances: [Dance]
        dance(id: ID!): Dance
    }

    extend type Mutation {
        createDance(
            artist_id: ID!, 
            balance: Int!, 
            posture: Int!, 
            coordination: Int!, 
            flexibility: Int!, 
            strength: Int!
        ): Dance!

        updateDance(
            id: ID!, 
            artist_id: ID!, 
            balance: Int!, 
            posture: Int!, 
            coordination: Int!, 
            flexibility: Int!, 
            strength: Int!, 
            pity_timer: Int!
        ): Dance!
        
        deleteDance(
            id: ID!
        ): Dance!
    }
    
    type Dance {
        id: ID!
        balance: Int!
        posture: Int!
        coordination: Int!
        flexibility: Int!
        strength: Int!
        pity_timer: Int!
        artist: Artist!
    }
`

module.exports = schema