const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        danceSkills: [DanceSkill]
        danceSkill(id: ID!): DanceSkill
    }

    extend type Mutation {
        createDanceSkill(artistId: ID!, balance: Int!, posture: Int!, coordination: Int!, flexibility: Int!, strength: Int!) : DanceSkill
        updateDanceSkill(id: ID!, artistId: ID!, balance: Int!, posture: Int!, coordination: Int!, flexibility: Int!, strength: Int!, pityTimer: Int!): DanceSkill
        deleteDanceSkill(id: ID!): Boolean!
    }
    
    type DanceSkill {
        id: ID!
        balance: Int!
        posture: Int!
        coordination: Int!
        flexibility: Int!
        strength: Int!
        pityTimer: Int!
        
        createdAt: Date!
        updatedAt: Date!
    }
`

module.exports = schema