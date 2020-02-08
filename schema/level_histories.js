const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        levelHistories: [Artist!]!
        levelHistory(id: ID!): Artist
    }

    extend type Mutation {
        createLevelHistory(artistId: ID!, points: Int!): LevelHistory!
        updateLevelHistory(id: ID!, artistId: ID!, points: Int!): LevelHistory
        deleteLevelHistory(id: ID!): Boolean!
    }
    
    type LevelHistory {
        id: ID!
        level: Int!
        artist: Artist!
    }
`

module.exports = schema