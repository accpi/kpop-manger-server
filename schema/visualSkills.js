const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        visualSkills: [VisualSkill!]!
        visualSkill(id: ID!): VisualSkill
    }

    extend type Mutation {
        createVisualSkill(artistId: ID!, pretty: Int!, sexy: Int!, cute: Int!, elegant: Int!, cool: Int!) : VisualSkill!
        updateVisualSkill(id: ID!, artistId: ID!, pretty: Int!, sexy: Int!, cute: Int!, elegant: Int!, cool: Int!, pityTimer: Int!): VisualSkill
        deleteVisualSkill(id: ID!): Boolean!
    }
    
    type VisualSkill {
        id: ID!
        pretty: Int!
        sexy: Int!
        cute: Int!
        elegant: Int!
        cool: Int!
        pityTimer: Int!
        artist: Artist!
        createdAt: Date!
        updatedAt: Date!
    }
`

module.exports = schema