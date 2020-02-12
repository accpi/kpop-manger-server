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
        album: async (song, __, { dataSources }) => {
            const albums = await dataSources.AlbumAPI.get()
            return await albums.find(album => 
                song.album_id === album.id
            )
        },
    }
}

module.exports = resolvers