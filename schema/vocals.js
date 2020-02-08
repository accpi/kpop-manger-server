const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        vocalSkills: [VocalSkill!]!
        vocalSkill(id: ID!): VocalSkill
    }

    extend type Mutation {
        createVocalSkill(artistId: ID!, breathing: Int!, diction: Int!, range: Int!, control: Int!, empathy: Int!): VocalSkill!
        updateVocalSkill(id: ID!, artistId: ID!, breathing: Int!, diction: Int!, range: Int!, control: Int!, empathy: Int!, pityTimer: Int!): VocalSkill
        deleteVocalSkill(id: ID!): Boolean!
    }
    
    type VocalSkill {
        id: ID!
        breathing: Int!
        diction: Int!
        range: Int!
        control: Int!
        empathy: Int!
        pity_timer: Int!
        artist: Artist!
    }
`

module.exports = schema