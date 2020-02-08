const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        artists: [Artist!]!
        artist(id: ID!): Artist
    }

    extend type Mutation {
        createArtist(
            first_name: String!, 
            last_name: String!, 
            stage_name: String!, 
            birthday: String!, 
            sex: String!,
            exp: Int!,
            user_id: ID!,
            birthplace_id: ID!,
            group_id: ID
        ): Artist!

        updateArtist(
            id: ID!, 
            first_name: String!, 
            last_name: String!, 
            stage_name: String!, 
            birthday: String!, 
            sex: String!,
            exp: Int!,
            user_id: ID!,
            birthplace_id: ID!,
            group_id: ID
        ): Artist!

        deleteArtist(
            id: ID!
        ): Artist!
    }
    
    type Artist {
        id: ID!
        first_name: String!
        last_name: String!
        stage_name: String!
        birthday: Date!
        sex: String!
        exp: Int!
        birthplace: Birthplace!
        vocals: Vocals
        visuals: Visuals
        dance: Dance
        personality: Personality
        intangibles: Intangibles
        level_histories: [LevelHistory]
        album_contributions: [AlbumContribution]
        user: User!
    }
`

module.exports = schema