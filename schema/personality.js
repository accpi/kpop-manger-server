const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        personalities: [Personality]
        personality(id: ID!): Personality
    }

    extend type Mutation {
        createPersonality(
            artist_id: ID!, 
            funny: Int!, 
            cuteness: Int!, 
            charisma: Int!, 
            outgoing: Int!, 
            pleasant: Int!
        ): Personality!
        
        updatePersonality(
            id: ID!, 
            artist_id: ID!, 
            funny: Int!, 
            cuteness: Int!, 
            charisma: Int!, 
            outgoing: Int!, 
            pleasant: Int!, 
            pity_timer: Int!
        ): Personality!
        
        deletePersonality(
            id: ID!
        ): Personality!
    }
    
    type Personality {
        id: ID!
        funny: Int!
        cuteness: Int!
        charisma: Int!
        outgoing: Int!
        pleasant: Int!
        pity_timer: Int!
        artist: Artist!
    }
`

module.exports = schema