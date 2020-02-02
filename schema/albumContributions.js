const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        albumContributions: [AlbumContribution!]!
        albumContribution(id: ID!): AlbumContribution
    }

    extend type Mutation {
        createAlbumContribution(artistId: ID!, albumId: ID!, points: Int!) : AlbumContribution!
        updateAlbumContribution(id: ID!, artistId: ID!, albumId: ID!, points: Int!): AlbumContribution
        deleteAlbumContribution(id: ID!): Boolean!
    }
    
    type AlbumContribution {
        id: ID!
        points: Int!
        artist: Artist!
        album: Album!
        createdAt: Date!
        updatedAt: Date!
    }
`

module.exports = schema