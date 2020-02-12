const { combineResolvers } = require('graphql-resolvers')
const { isAuthenticated, isAdmin } = require('./authorization')

const resolvers = {
    Query: {
        artists: async (_, __, { dataSources }) => {
            return await dataSources.ArtistAPI.get()
        },
        artist: async (_, { id }, { dataSources }) => {
            return await dataSources.ArtistAPI.getByID({ id })
        },
    },

    Mutation: {
        createArtist: async (
            _,
            { first_name, last_name, stage_name, birthday, sex, exp, user_id, birthplace_id, group_id },
            { dataSources },
        ) => {
            return await dataSources.ArtistAPI.post({
                first_name, last_name, stage_name, birthday, sex, exp, user_id, birthplace_id, group_id
            })
        },

        updateArtist: async (
            _,
            { id, first_name, last_name, stage_name, birthday, sex, exp, user_id, birthplace_id, group_id  },
            { dataSources },
        ) => {
            return await dataSources.ArtistAPI.post({
                id, first_name, last_name, stage_name, birthday, sex, exp, user_id, birthplace_id, group_id 
            })
        },

        deleteArtist: combineResolvers(
            isAdmin,
            async (
                    _,
                    { id },
                    { dataSources },
                ) => {
                    return await dataSources.ArtistAPI.delete({
                        id
            })
        }),
    },

    Album: {

    }
}

module.exports = resolvers