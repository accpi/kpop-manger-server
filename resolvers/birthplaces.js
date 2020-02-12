const { combineResolvers } = require('graphql-resolvers')
const { isAuthenticated, isAdmin } = require('./authorization')

const resolvers = {
    Query: {
        birthplaces: async (_, __, { dataSources }) => {
            return await dataSources.BirthplaceAPI.get()
        },
        birthplace: async (_, { id }, { dataSources }) => {
            return await dataSources.BirthplaceAPI.getByID({ id })
        },
    },

    Mutation: {
        createBirthplace: async (
            _,
            { country, city },
            { dataSources },
        ) => {
            return await dataSources.BirthplaceAPI.post({
                country, city
            })
        },

        updateBirthplace: async (
            _,
            { id, country, city },
            { dataSources },
        ) => {
            return await dataSources.BirthplaceAPI.post({
                id, country, city
            })
        },

        deleteBirthplace: combineResolvers(
            isAdmin,
            async (
                    _,
                    { id },
                    { dataSources },
                ) => {
                    return await dataSources.BirthplaceAPI.delete({
                        id
            })
        }),
    },

    Album: {

    }
}

module.exports = resolvers