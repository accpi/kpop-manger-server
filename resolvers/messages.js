const { combineResolvers } = require('graphql-resolvers')
const { isAuthenticated, isMessageOwner } = require('./authorization')

const resolvers = {
    Query: {
        messages: async (parent, args, { models }) => {
            return await models.Message.findAll()
        },
        message: async (parent, { id }, { models }) => {
            return await models.Message.findByPk(id)
        },
    },

    Mutation: {
        createMessage: combineResolvers(
            isAuthenticated,
            async (parent, { text }, { me, models }) => {
                try {
                    return await models.Message.create({
                        text,
                        userId: me.id,
                    })
                }
                catch (error) {
                    throw new Error(error)
                }
            }
        ),
        deleteMessage: combineResolvers(
            isAuthenticated,
            isMessageOwner,
            async (parent, { id }, { models }) => {
                try {
                    return await models.Message.destroy({
                        where: { id }
                    })
                }
                catch (error) {
                    throw new Error(error)
                }
            }
        ),
    },

    Message: {
        user: async (message, args, { models }) => {
            return await models.User.findByPk(message.user_id)
        }
    },
}

module.exports = resolvers