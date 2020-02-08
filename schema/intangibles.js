const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        intangibles: [IntangibleSkill]
        intangible(id: ID!): IntangibleSkill
    }

    extend type Mutation {
        createIntangibles(
            artist_id: ID!, 
            stamina: Int!, 
            morale: Int!, 
            songwriting: Int!, 
            composition: Int!, 
            choreography: Int!
        ): Intangibles!
        
        updateIntangibles(
            id: ID!, 
            artist_id: ID!, 
            stamina: Int!, 
            morale: Int!, 
            songwriting: Int!, 
            composition: Int!, 
            choreography: Int!, 
            pity_timer: Int!
        ): Intangibles!
        
        deleteIntangibles(
            id: ID!
        ): Intangibles!
    }
    
    type Intangibles {
        id: ID!
        stamina: Int!
        morale: Int!
        songwriting: Int!
        composition: Int!
        choreography: Int!
        pity_timer: Int!
        artist: Artist!
    }
`

module.exports = schema