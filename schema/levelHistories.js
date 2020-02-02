const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        levelHistories: [Artist!]!
        levelHistory(id: ID!): Artist
    }

    extend type Mutation {
        createLevelHistory(artistId: ID!, points: Int!) : LevelHistory!
        updateLevelHistory(id: ID!, artistId: ID!, points: Int!): LevelHistory
        deleteLevelHistory(id: ID!): Boolean!
    }
    
    type LevelHistory {
        id: ID!
        points: Int!
        artist: Artist!
        createdAt: Date!
        updatedAt: Date!
    }
`

module.exports = schema