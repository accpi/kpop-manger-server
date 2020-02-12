const { combineResolvers } = require('graphql-resolvers')
const { isAuthenticated, isAdmin } = require('./authorization')

const resolvers = {
    Query: {
        songs: async (_, __, { dataSources }) => {
            return await dataSources.SongAPI.get()
        },
        song: async (_, { id }, { dataSources }) => {
            return await dataSources.SongAPI.getByID({ id })
        },
    },

    Mutation: {
        createSong: async (
            _,
            { name, album_id },
            { dataSources },
        ) => {
            return await dataSources.SongAPI.post({
                name, album_id
            })
        },

        updateSong: async (
            _,
            { id, name, album_id },
            { dataSources },
        ) => {
            return await dataSources.SongAPI.post({
                id, name, album_id
            })
        },

        deleteSong: combineResolvers(
            isAdmin,
            async (
                    _,
                    { id },
                    { dataSources },
                ) => {
                    return await dataSources.SongAPI.delete({
                        id
            })
        }),
    },

    Song: {

    }
}

module.exports = resolvers