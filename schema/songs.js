const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        songs: [Song]
        song(id: ID!): Song
    }

    extend type Mutation {
        createSong(
            name: String!, 
            album_id: ID!
        ): Song!
        
        updateSong(
            id: ID!, 
            name: String!, 
            album_id: ID!
        ): Song!
        
        deleteSong(
            id: ID!
        ): Song!
    }
    
    type Song {
        id: ID!
        name: String!
        album: Album!
    }
`

module.exports = schema