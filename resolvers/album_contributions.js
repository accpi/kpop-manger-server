const { combineResolvers } = require('graphql-resolvers')
const { isAuthenticated, isAdmin } = require('./authorization')

const resolvers = {
    Query: {
        albumContributions: async (_, args, { dataSources }) => {
            return await dataSources.AlbumContributionAPI.get()
        },
        albumContribution: async (_, { id }, { dataSources }) => {
            return await dataSources.AlbumContributionAPI.getByID({ id })
        },
    },

    Mutation: {
        createAlbumContribution: async (
            _,
            { artist_id, album_id, visuals, vocals, dance, personality },
            { dataSources },
        ) => {
            return await dataSources.AlbumContributionAPI.post({
                artist_id, 
                album_id, 
                visuals, 
                vocals, 
                dance, 
                personality
            })
        },

        updateAlbumContribution: async (
            _,
            { id, artist_id, album_id, visuals, vocals, dance, personality },
            { dataSources },
        ) => {
            return await dataSources.AlbumContributionAPI.post({
                id,
                artist_id, 
                album_id, 
                visuals, 
                vocals, 
                dance, 
                personality
            })
        },

        deleteAlbumContribution: combineResolvers(
            isAdmin,
            async (
                    _,
                    { id },
                    { dataSources },
                ) => {
                    return await dataSources.AlbumContributionAPI.delete({
                        id
            })
        }),
    },

    AlbumContribution: {

    }
}

module.exports = resolvers