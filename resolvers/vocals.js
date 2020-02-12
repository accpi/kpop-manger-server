const { combineResolvers } = require('graphql-resolvers')
const { isAuthenticated, isAdmin } = require('./authorization')

const resolvers = {
    Query: {
        vocals: async (_, __, { dataSources }) => {
            return await dataSources.VocalAPI.get()
        },
        vocal: async (_, { id }, { dataSources }) => {
            return await dataSources.VocalAPI.getByID({ id })
        },
    },

    Mutation: {
        createVocal: async (
            _,
            { artist_id, breathing, diction, range, control, empathy },
            { dataSources },
        ) => {
            return await dataSources.VocalAPI.post({
                artist_id, breathing, diction, range, control, empathy
            })
        },

        updateVocal: async (
            _,
            { id, artist_id, breathing, diction, range, control, empathy, pity_timer },
            { dataSources },
        ) => {
            return await dataSources.VocalAPI.post({
                id, artist_id, breathing, diction, range, control, empathy, pity_timer
            })
        },

        deleteVocal: combineResolvers(
            isAdmin,
            async (
                    _,
                    { id },
                    { dataSources },
                ) => {
                    return await dataSources.VocalAPI.delete({
                        id
            })
        }),
    },

    Vocals: {
        artist: async (vocals, __, { dataSources }) => {
            const artists = await dataSources.ArtistAPI.get()
            return await artists.find(artist => 
                vocals.artist_id === artist.id
            )
        },
    }
}

module.exports = resolvers