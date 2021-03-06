const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { combineResolvers } = require('graphql-resolvers')
const { isAuthenticated, isAdmin } = require('./authorization')

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
        createUser: async (
            _,
            { username, email, password, first_name, last_name, role },
            { dataSources, secret },
        ) => {
            const user = await dataSources.UserAPI.post({
                username,
                email,
                password,
                first_name, 
                last_name,
                role,
            })

            return { token: createToken(user, secret, '6h') }
        },

        updateUser: async (
            _,
            { id, username, email, password, first_name, last_name, role },
            { dataSources, secret },
        ) => {
            const user = await dataSources.UserAPI.update({
                id,
                username,
                email,
                password,
                first_name, 
                last_name,
                role,
            })

            return { token: createToken(user, secret, '6h') }
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

            return { token: createToken(user, secret, '6h') }
        }
    },

    User: {
        artists: async (user, __, { dataSources }) => {
            const artists = await dataSources.ArtistAPI.get()
            return await artists.filter(artist => 
                user.id === artist.user_id
            )
        },
        groups: async (user, __, { dataSources }) => {
            const groups = await dataSources.GroupAPI.get()
            return await groups.filter(group => 
                user.id === group.user_id
            )
        },
        trainers: async (user, __, { dataSources }) => {
            const trainers = await dataSources.TrainerAPI.get()
            return await trainers.filter(trainer => 
                user.id === trainer.user_id
            )
        },
    },
}

async function validatePassword(inputPass, storedPass) {
    return await bcrypt.compare(inputPass, storedPass)
}

module.exports = resolvers