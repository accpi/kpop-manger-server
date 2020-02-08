const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        artists: [Artist!]!
        artist(id: ID!): Artist
    }

    extend type Mutation {
        createArtist(firstName: String!, lastName: String!, stageName: String!, birthday: String!, sex: String!, birthplace: ID!): Artist!
        updateArtist(id: ID!, firstName: String!, lastName: String!, stageName: String!, birthday: String!, sex: String!, birthplace: ID!): Artist
        deleteArtist(id: ID!): Boolean!
    }
    
    type Artist {
        id: ID!
        firstName: String!
        lastName: String!
        stageName: String!
        birthday: Date!
        sex: String!
        exp: Int!
        birthplace: Birthplace
        vocals: Vocals
        visuals: Visuals
        dance: Dance
        personality: Personality
        intangibles: Intangibles
        level_histories: [LevelHistory]
        albumContributions: [AlbumContribution]
        user: User!
    }
`

module.exports = schema