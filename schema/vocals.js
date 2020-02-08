const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        vocals: [Vocals!]!
        vocal(id: ID!): Vocals
    }

    extend type Mutation {
        createVocal(
            artist_id: ID!, 
            breathing: Int!, 
            diction: Int!, 
            range: Int!, 
            control: Int!, 
            empathy: Int!
        ): Vocals!
        
        updateVocal(
            id: ID!, 
            artist_id: ID!, 
            breathing: Int!, 
            diction: Int!, 
            range: Int!, 
            control: Int!, 
            empathy: Int!, 
            pity_timer: Int!
        ): Vocals
        
        deleteVocal(
            id: ID!
        ): Vocals!
    }
    
    type Vocals {
        id: ID!
        breathing: Int!
        diction: Int!
        range: Int!
        control: Int!
        empathy: Int!
        pity_timer: Int!
        artist: Artist!
    }
`

module.exports = schema