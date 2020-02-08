const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        levelHistories: [LevelHistory]
        levelHistory(id: ID!): LevelHistory
    }

    extend type Mutation {
        createLevelHistory(
            artist_id: ID!, 
            level: Int!,
            pretty: Int,
            sexy: Int,
            cute: Int,
            elegant: Int,
            cool: Int,
            breathing: Int,
            diction: Int,
            range: Int,
            control: Int,
            empathy: Int,
            balance: Int,
            posture: Int,
            coordination: Int,
            flexibility: Int,
            strength: Int,
            funny: Int,
            cuteness: Int,
            charisma: Int,
            outgoing: Int,
            pleasant: Int,
            songwriting: Int,
            composition: Int,
            choreography: Int
        ): LevelHistory!

        updateLevelHistory(
            id: ID!,
            artist_id: ID!, 
            level: Int!,
            pretty: Int,
            sexy: Int,
            cute: Int,
            elegant: Int,
            cool: Int,
            breathing: Int,
            diction: Int,
            range: Int,
            control: Int,
            empathy: Int,
            balance: Int,
            posture: Int,
            coordination: Int,
            flexibility: Int,
            strength: Int,
            funny: Int,
            cuteness: Int,
            charisma: Int,
            outgoing: Int,
            pleasant: Int,
            songwriting: Int,
            composition: Int,
            choreography: Int
        ): LevelHistory!
        
        deleteLevelHistory(
            id: ID!
        ): LevelHistory!
    }
    
    type LevelHistory {
        id: ID!
        level: Int!
        pretty: Int
        sexy: Int
        cute: Int
        elegant: Int
        cool: Int
        breathing: Int
        diction: Int
        range: Int
        control: Int
        empathy: Int
        balance: Int
        posture: Int
        coordination: Int
        flexibility: Int
        strength: Int
        funny: Int
        cuteness: Int
        charisma: Int
        outgoing: Int
        pleasant: Int
        songwriting: Int
        composition: Int
        choreography: Int
        artist: Artist!
    }
`

module.exports = schema