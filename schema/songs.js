const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        songs: [Song!]!
        song(id: ID!): Song
    }

    extend type Mutation {
        createSong(name: String!, albumId: ID!): Song!
        updateSong(id: ID!, name: String!, albumId: ID!): Song
        deleteSong(id: ID!): Boolean!
    }
    
    type Song {
        id: ID!
        name: String!
        album: Album
    }
`

module.exports = schema