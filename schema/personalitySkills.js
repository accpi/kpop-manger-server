const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        personalitySkills: [PersonalitySkill!]!
        personalitySkill(id: ID!): PersonalitySkill
    }

    extend type Mutation {
        createPersonalitySkill(artistId: ID!, funny: Int!, cuteness: Int!, charisma: Int!, outgoing: Int!, pleasant: Int!) : PersonalitySkill!
        updatePersonalitySkill(id: ID!, artistId: ID!, funny: Int!, cuteness: Int!, charisma: Int!, outgoing: Int!, pleasant: Int!, pityTimer: Int!): PersonalitySkill
        deletePersonalitySkill(id: ID!): Boolean!
    }
    
    type PersonalitySkill {
        id: ID!
        funny: Int!
        cuteness: Int!
        charisma: Int!
        outgoing: Int!
        pleasant: Int!
        pityTimer: Int!
        artist: Artist!
        createdAt: Date!
        updatedAt: Date!
    }
`

module.exports = schema