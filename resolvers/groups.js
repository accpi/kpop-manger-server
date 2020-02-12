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

    }
}

module.exports = resolvers