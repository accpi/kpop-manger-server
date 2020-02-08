const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        visualSkills: [VisualSkill]
        visualSkill(id: ID!): VisualSkill
    }

    extend type Mutation {
        createVisualSkill(artist_id: ID!, pretty: Int!, sexy: Int!, cute: Int!, elegant: Int!, cool: Int!): VisualSkill!
        updateVisualSkill(id: ID!, artist_id: ID!, pretty: Int!, sexy: Int!, cute: Int!, elegant: Int!, cool: Int!, pity_timer: Int!): VisualSkill
        deleteVisualSkill(id: ID!): Boolean!
    }
    
    type VisualSkill {
        id: ID!
        pretty: Int!
        sexy: Int!
        cute: Int!
        elegant: Int!
        cool: Int!
        pity_timer: Int!
        artist: Artist!
    }
`

module.exports = schema