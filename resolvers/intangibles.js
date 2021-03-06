const { combineResolvers } = require('graphql-resolvers')
const { isAuthenticated, isAdmin } = require('./authorization')

const resolvers = {
    Query: {
        intangibles: async (_, __, { dataSources }) => {
            return await dataSources.IntangibleAPI.get()
        },
        intangible: async (_, { id }, { dataSources }) => {
            return await dataSources.IntangibleAPI.getByID({ id })
        },
    },

    Mutation: {
        createIntangibles: async (
            _,
            { artist_id, stamina, morale, songwriting, composition, choreography },
            { dataSources },
        ) => {
            return await dataSources.IntangibleAPI.post({
                artist_id, stamina, morale, songwriting, composition, choreography
            })
        },

        updateIntangibles: async (
            _,
            { id, artist_id, stamina, morale, songwriting, composition, choreography, pity_timer },
            { dataSources },
        ) => {
            return await dataSources.IntangibleAPI.update({
                id, artist_id, stamina, morale, songwriting, composition, choreography, pity_timer
            })
        },

        deleteIntangibles: combineResolvers(
            isAdmin,
            async (
                    _,
                    { id },
                    { dataSources },
                ) => {
                    return await dataSources.IntangibleAPI.delete({
                        id
            })
        }),
    },

    Intangibles: {
        artist: async (intangibles, __, { dataSources }) => {
            const artists = await dataSources.ArtistAPI.get()
            return await artists.find(artist => 
                intangibles.artist_id === artist.id
            )
        },
    }
}

module.exports = resolvers