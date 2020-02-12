const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        albums: [Album]
        album(id: ID!): Album
    }

    extend type Mutation {
        createAlbum(
            group_id: ID!, 
            name: String!,
            genre: String!,
            style: String
        ): Album!

        updateAlbum(
            id: ID!, 
            group_id: ID!, 
            name: String!,
            genre: String!,
            style: String
        ): Album!

        deleteAlbum(
            id: ID!
        ): Album!
    }
    
    type Album {
        id: ID!
        name: String!
        genre: String!
        style: String!
        group: Group!
        songs: [Song]
    }
`

module.exports = schema