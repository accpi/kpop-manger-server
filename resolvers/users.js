const jwt = require('jsonwebtoken')
const { combineResolvers } = require('graphql-resolvers')

const { isAdmin } = require('./authorization')

const createToken = async (user, secret, expiresIn) => {
    const { id, email, username, role } = user
    return await jwt.sign({ id, email, username, role }, secret, {
        expiresIn: expiresIn,
    })
}

const resolvers = {
    Query: {
        users: async (parent, args, { models }) => {
            return await models.User.findAll()
        },
        user: async (parent, { id }) => {
            return await models.User.findByPk(id)
        },

        me: async (parent, args, { me }) => {
            if (!me) {
                return null
            }
            return await models.User.findByPk(me.id)
        },
    },

    Mutation: {
        deleteUser: combineResolvers(
            isAdmin,
            async (parent, { id }, { models, me }) => {
                return await models.User.destroy({
                    where: { id },
                })
            }
        ),

        signUp: async (
            parent,
            { username, email, password, firstName, lastName },
            { models, secret },
        ) => {
            const user = await models.User.create({
                username,
                email,
                password,
                firstName, 
                lastName
            })

            return { token: createToken(user, secret, '30m') }
        },

        signIn: async (
            parent,
            { login, password },
            { models, secret },
        ) => {
            const user = await models.User.findByLogin(login)

            if(!user) {
                throw new UserInputError(
                    'No user found with those login credentials'
                )
            }

            const isValid = await user.validatePassword(password)

            if(!isValid) {
                throw new AuthenticationError(
                    'Invalid password'
                )
            }

            return { token: createToken(user, secret, '30m') }
        }
    },

    User: {
        messages: async (user, args, { models }) => {
            return await models.Message.findAll({
                where: {
                    userId: user.id,
                }
            })
        }
    },
}

module.exports = resolvers