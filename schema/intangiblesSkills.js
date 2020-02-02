const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        intangibleSkills: [IntangibleSkill!]!
        intangibleSkill(id: ID!): IntangibleSkill
    }

    extend type Mutation {
        createIntangibleSkill(artistId: ID!, stamina: Int!, morale: Int!, songwriting: Int!, composition: Int!, choreography: Int!) : IntangibleSkill!
        updateIntangibleSkill(id: ID!, artistId: ID!, stamina: Int!, morale: Int!, songwriting: Int!, composition: Int!, choreography: Int!, pityTimer: Int!): IntangibleSkill
        deleteIntangibleSkill(id: ID!): Boolean!
    }
    
    type IntangibleSkill {
        id: ID!
        stamina: Int!
        morale: Int!
        songwriting: Int!
        composition: Int!
        choreography: Int!
        pityTimer: Int!
        artist: Artist!
        createdAt: Date!
        updatedAt: Date!
    }
`

module.exports = schema