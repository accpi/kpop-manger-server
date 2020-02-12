const { combineResolvers } = require('graphql-resolvers')
const { isAuthenticated, isAdmin } = require('./authorization')

const resolvers = {
    Query: {
        groups: async (_, __, { dataSources }) => {
            return await dataSources.GroupAPI.get()
        },
        group: async (_, { id }, { dataSources }) => {
            return await dataSources.GroupAPI.getByID({ id })
        },
    },

    Mutation: {
        createGroup: async (
            _,
            { name, fan_name },
            { dataSources },
        ) => {
            return await dataSources.GroupAPI.post({
                name, fan_name
            })
        },

        updateGroup: async (
            _,
            { id, name, fan_name, fans, popularity },
            { dataSources },
        ) => {
            return await dataSources.GroupAPI.post({
                id, name, fan_name, fans, popularity
            })
        },

        deleteGroup: combineResolvers(
            isAdmin,
            async (
                    _,
                    { id },
                    { dataSources },
                ) => {
                    return await dataSources.GroupAPI.delete({
                        id
            })
        }),
    },

    Group: {
        user: async (group, __, { dataSources }) => {
            const users = await dataSources.UserAPI.get()
            return await users.find(user => 
                group.user_id === user.id
            )
        },
        albums: async (group, __, { dataSources }) => {
            const albums = await dataSources.AlbumAPI.get()
            return await albums.filter(album => 
                group.id === album.group_id
            )
        },
        artists: async (group, __, { dataSources }) => {
            const artists = await dataSources.ArtistAPI.get()
            return await artists.filter(artist => 
                group.id === artist.group_id
            )
        },
    }
}

module.exports = resolvers