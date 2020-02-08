const { gql } = require('apollo-server-express')

const schema = gql`
    extend type Query {
        visuals: [Visuals]
        visual(id: ID!): Visuals
    }

    extend type Mutation {
        createVisual(
            artist_id: ID!, 
            pretty: Int!, 
            sexy: Int!, 
            cute: Int!, 
            elegant: Int!, 
            cool: Int!
        ): Visuals!
        
        updateVisual(
            id: ID!, 
            artist_id: ID!, 
            pretty: Int!, 
            sexy: Int!, 
            cute: Int!, 
            elegant: Int!, 
            cool: Int!, 
            pity_timer: Int!
        ): Visuals
        
        deleteVisual(
            id: ID!
        ): Visuals!
    }
    
    type Visuals {
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