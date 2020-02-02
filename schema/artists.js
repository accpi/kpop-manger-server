const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        artists: [Artist!]!
        artist(id: ID!): Artist
    }

    extend type Mutation {
        createArtist(firstName: String!, lastName: String!, stageName: String!, birthday: String!, sex: String!, birthplace: ID!) : Artist!
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
        birthplace: Birthplace
        vocalSkill: VocalSkill
        visualSkill: VisualSkill
        danceSKill: DanceSkill
        personalitySkill: PersonalitySkill
        intangibleSkill: IntangiblesSkill
        levelHistory: [LevelHistory]
        albumContributions: [AlbumContribution]
        user: User!
        createdAt: Date!
        updatedAt: Date!
    }
`

module.exports = schema