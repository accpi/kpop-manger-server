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
            return await dataSources.DanceAPI.update({
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

    Dance: {
        artist: async (dance, __, { dataSources }) => {
            const artists = await dataSources.ArtistAPI.get()
            return await artists.find(artist => 
                dance.artist_id === artist.id
            )
        },
    }
}

module.exports = resolvers