const { combineResolvers } = require('graphql-resolvers')
const { isAuthenticated, isAdmin } = require('./authorization')

const resolvers = {
    Query: {
        trainers: async (_, __, { dataSources }) => {
            return await dataSources.TrainerAPI.get()
        },
        trainer: async (_, { id }, { dataSources }) => {
            return await dataSources.TrainerAPI.getByID({ id })
        },
    },

    Mutation: {
        createTrainer: async (
            _,
            { first_name, last_name, dance, vocals, personality, visuals },
            { dataSources },
        ) => {
            return await dataSources.TrainerAPI.post({
                first_name, last_name, dance, vocals, personality, visuals
            })
        },

        updateTrainer: async (
            _,
            { id, first_name, last_name, dance, vocals, personality, visuals },
            { dataSources },
        ) => {
            return await dataSources.TrainerAPI.post({
                id, first_name, last_name, dance, vocals, personality, visuals
            })
        },

        deleteTrainer: combineResolvers(
            isAdmin,
            async (
                    _,
                    { id },
                    { dataSources },
                ) => {
                    return await dataSources.TrainerAPI.delete({
                        id
            })
        }),
    },

    Trainer: {

    }
}

module.exports = resolvers