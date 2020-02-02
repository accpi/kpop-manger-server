require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express')

const schema = require('./schema')
const resolvers = require('./resolvers')
const { models, sequelize } = require('./models')

const app = express()
app.use(cors())

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: async () => ({
        models,
        me: await models.User.findByLogin('foo'),
        secret: process.env.JWT_SECRET,
    })
})

server.applyMiddleware({ app, path: '/graphql' })

const eraseDatabaseOnSync = true

sequelize.sync({ force:  eraseDatabaseOnSync }).then(async () => {
    if (eraseDatabaseOnSync) {
        createUsersWithMessages()
    }

    app.listen({ port: 8000 }, () => {
        console.log('Apollo Server on localhost:8000/graphql')
    })
})

const createUsersWithMessages = async () => {
    await models.User.create(
        {
            username: 'foo',
            email: 'foo@email.com',
            password: 'foo123456',
            messages: [
                {
                    text: 'message 1a',
                },
            ],
        },
        {
            include: [models.Message]
        }
    )

    await models.User.create(
        {
            username: 'bar',
            email: 'bar@email.com',
            password: 'bar123456',
            messages: [
                {
                    text: 'message 2a',
                },
                {
                    text: 'message 2b'
                },
            ],
        },
        {
            include: [models.Message],
        },
    )
}