const { combineResolvers } = require('graphql-resolvers')
const { isAuthenticated, isAdmin } = require('./authorization')

const resolvers = {
    Query: {
        albums: async (_, __, { dataSources }) => {
            return await dataSources.AlbumAPI.get()
        },
        album: async (_, { id }, { dataSources }) => {
            return await dataSources.AlbumAPI.getByID({ id })
        },
    },

    Mutation: {
        createAlbum: async (
            _,
            { group_id, name, genre, style },
            { dataSources },
        ) => {
            return await dataSources.AlbumAPI.post({
                group_id, name, genre, style
            })
        },

        updateAlbum: async (
            _,
            { id, group_id, name, genre, style },
            { dataSources },
        ) => {
            return await dataSources.AlbumAPI.update({
                id, group_id, name, genre, style
            })
        },

        deleteAlbum: combineResolvers(
            isAdmin,
            async (
                    _,
                    { id },
                    { dataSources },
                ) => {
                    return await dataSources.AlbumAPI.delete({
                        id
            })
        }),
    },

    Album: {
        group: async (album, __, { dataSources }) => {
            const groups = await dataSources.GroupAPI.get()
            return await groups.find(group => 
                album.group_id === group.id
            )
        },
        songs: async (album, __, { dataSources }) => {
            const songs = await dataSources.SongAPI.get()
            return await songs.filter(song => 
                album.id === song.album_id
            )
        },
    }
}

module.exports = resolvers