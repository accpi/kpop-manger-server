const { combineResolvers } = require('graphql-resolvers')
const { isAuthenticated, isAdmin } = require('./authorization')

const resolvers = {
    Query: {
        dances: async (_, __, { dataSources }) => {
            return await dataSources.DanceAPI.get()
        },
        dance: async (_, { id }, { dataSources }) => {
            return await dataSources.DanceAPI.getByID({ id })
        },
    },

    Mutation: {
        createDance: async (
            _,
            { artist_id, balance, posture, coordination, flexibility, strength },
            { dataSources },
        ) => {
            return await dataSources.DanceAPI.post({
                artist_id, balance, posture, coordination, flexibility, strength
            })
        },

        updateDance: async (
            _,
            { id, artist_id, balance, posture, coordination, flexibility, strength, pity_timer },
            { dataSources },
        ) => {
            return await dataSources.DanceAPI.post({
                id, artist_id, balance, posture, coordination, flexibility, strength, pity_timer
            })
        },

        deleteDance: combineResolvers(
            isAdmin,
            async (
                    _,
                    { id },
                    { dataSources },
                ) => {
                    return await dataSources.DanceAPI.delete({
                        id
            })
        }),
    },

    Album: {

    }
}

module.exports = resolvers