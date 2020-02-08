const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        albumContributions: [AlbumContribution]
        albumContribution(id: ID!): AlbumContribution
    }

    extend type Mutation {
        createAlbumContribution(
            artist_id: ID!, 
            album_id: ID!, 
            visuals: Int!,
            vocals: Int!,
            dance: Int!, 
            personality: Int!
        ): AlbumContribution

        updateAlbumContribution(
            id: ID!,
            artist_id: ID!, 
            album_id: ID!, 
            visuals: Int!,
            vocals: Int!,
            dance: Int!, 
            personality: Int!
        ): AlbumContribution
        
        deleteAlbumContribution(id: ID!): Boolean!
    }
    
    type AlbumContribution {
        id: ID!
        visuals: Int!
        vocals: Int!
        dance: Int!
        personality: Int!
        artist: Artist!
        album: Album!
    }
`

module.exports = schema