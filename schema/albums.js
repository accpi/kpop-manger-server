const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        albums: [Album]
        album(id: ID!): Album
    }

    extend type Mutation {
        createAlbum(artist_id: ID!, name: String!): Album
        updateAlbum(id: ID!, artist_id: ID!, name: String!): Album
        deleteAlbum(id: ID!): Album
    }
    
    type Album {
        id: ID!
        name: String!
        artist: Artist!
        genre: String!
        style: String!
    }
`

module.exports = schema