const { combineResolvers } = require('graphql-resolvers')
const { isAuthenticated, isAdmin } = require('./authorization')

const resolvers = {
    Query: {
        visuals: async (_, __, { dataSources }) => {
            return await dataSources.VisualAPI.get()
        },
        visual: async (_, { id }, { dataSources }) => {
            return await dataSources.VisualAPI.getByID({ id })
        },
    },

    Mutation: {
        createVisual: async (
            _,
            { artist_id, pretty, sexy, cute, elegant, cool },
            { dataSources },
        ) => {
            return await dataSources.VisualAPI.post({
                artist_id, pretty, sexy, cute, elegant, cool
            })
        },

        updateVisual: async (
            _,
            { id, artist_id, pretty, sexy, cute, elegant, cool, pity_timer },
            { dataSources },
        ) => {
            return await dataSources.VisualAPI.post({
                id, artist_id, pretty, sexy, cute, elegant, cool, pity_timer
            })
        },

        deleteVisual: combineResolvers(
            isAdmin,
            async (
                    _,
                    { id },
                    { dataSources },
                ) => {
                    return await dataSources.VisualAPI.delete({
                        id
            })
        }),
    },

    Visuals: {
        artist: async (visuals, __, { dataSources }) => {
            const artists = await dataSources.ArtistAPI.get()
            return await artists.find(artist => 
                visuals.artist_id === artist.id
            )
        },
    }
}

module.exports = resolvers