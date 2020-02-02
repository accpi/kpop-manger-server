const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        albums: [Album!]!
        album(id: ID!): Album
    }

    extend type Mutation {
        createAlbum(artistId: ID!, name: String!) : Album!
        updateAlbum(id: ID!, artistId: ID!, name: String!): Album
        deleteAlbum(id: ID!): Boolean!
    }
    
    type Album {
        id: ID!
        name: String!
        artist: Artist!
        createdAt: Date!
        updatedAt: Date!
    }
`

module.exports = schema