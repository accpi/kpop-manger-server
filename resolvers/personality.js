const { combineResolvers } = require('graphql-resolvers')
const { isAuthenticated, isAdmin } = require('./authorization')

const resolvers = {
    Query: {
        personalities: async (_, __, { dataSources }) => {
            return await dataSources.PersonalityAPI.get()
        },
        personality: async (_, { id }, { dataSources }) => {
            return await dataSources.PersonalityAPI.getByID({ id })
        },
    },

    Mutation: {
        createPersonality: async (
            _,
            { artist_id, funny, cuteness, charisma, outgoing, pleasant },
            { dataSources },
        ) => {
            return await dataSources.PersonalityAPI.post({
                artist_id, funny, cuteness, charisma, outgoing, pleasant
            })
        },

        updatePersonality: async (
            _,
            { id, artist_id, funny, cuteness, charisma, outgoing, pleasant, pity_timer },
            { dataSources },
        ) => {
            return await dataSources.PersonalityAPI.post({
                id, artist_id, funny, cuteness, charisma, outgoing, pleasant, pity_timer
            })
        },

        deletePersonality: combineResolvers(
            isAdmin,
            async (
                    _,
                    { id },
                    { dataSources },
                ) => {
                    return await dataSources.PersonalityAPI.delete({
                        id
            })
        }),
    },

    Personality: {
        artist: async (personality, __, { dataSources }) => {
            const artists = await dataSources.ArtistAPI.get()
            return await artists.find(artist => 
                personality.artist_id === artist.id
            )
        },
    }
}

module.exports = resolvers