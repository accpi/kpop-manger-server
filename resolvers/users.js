const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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
        users: async (_, args, { dataSources }) => {
            return await dataSources.UserAPI.get()
        },
        user: async (_, { id }, { dataSources }) => {
            return await dataSources.UserAPI.getByID({ id })
        },

        me: async (_, args, { dataSources, me }) => {
            if (!me) {
                return null
            }
            else {
                var id = me.id
                return await dataSources.UserAPI.getByID({ id })
            }
        },
    },

    Mutation: {
        postUser: async (
            _,
            { username, email, password, firstName, lastName },
            { dataSources, secret },
        ) => {
            const user = await dataSources.UserAPI.post({
                username,
                email,
                password,
                firstName, 
                lastName
            })

            return { token: createToken(user, secret, '30m') }
        },

        updateUser: async (
            _,
            { username, email, password, firstName, lastName },
            { dataSources, secret },
        ) => {
            const user = await dataSources.UserAPI.update({
                username,
                email,
                password,
                firstName, 
                lastName
            })

            return { token: createToken(user, secret, '30m') }
        },

        deleteUser: combineResolvers(
            isAdmin,
            async (
                    _,
                    { username },
                    { dataSources },
                ) => {
                    return await dataSources.UserAPI.delete({
                        username
            })
        }),

        loginUser: async (
            _,
            { email, password },
            { dataSources, secret },
        ) => {
            const user = await dataSources.UserAPI.login({ email })

            if(!user) {
                throw new Error(
                    'No user found with those login credentials.'
                )
            }

            const isValid = await validatePassword(password, user.password)

            if(!isValid) {
                throw new Error(
                    'Invalid password.'
                )
            }

            return { token: createToken(user, secret, '30m') }
        }
    },

    /*
    Mutation: {
        deleteUser: combineResolvers(
            isAdmin,
            async (parent, { id }, { models, me }) => {
                return await models.User.destroy({
                    where: { id },
                })
            }
        ),

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
    */
}

async function validatePassword(inputPass, storedPass) {
    return await bcrypt.compare(inputPass, storedPass)
}

module.exports = resolvers