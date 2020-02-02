require('dotenv').config()

const jwt = require('jsonwebtoken')
const express = require('express')
const cors = require('cors')
const { ApolloServer, AuthenticationError } = require('apollo-server-express')

const schema = require('./schema')
const resolvers = require('./resolvers')
const { models, sequelize } = require('./models')

const pino = require('pino')
const logger = pino({ 
    level: process.env.LOG_LEVEL || 'DEBUG',
    prettyPrint: true // remove in production
})

const expressPino = require('express-pino-logger')
const expressLogger = expressPino({ logger })


const app = express()
app.use(cors())
app.use(expressLogger)

const getMe = async req => {
    const token = req.headers['x-token']

    if (token) {
        try {
            return await jwt.verify(token, process.env.JWT_SECRET)
        }
        catch (error) {
            throw new AuthenticationError(
                'Your session has expired. Sign in again.'
            )
        }
    }
}

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: async ({ req }) => {
        const me = await getMe(req)

        return {
            models,
            me,
            secret: process.env.JWT_SECRET
        }
    }
})

server.applyMiddleware({ app, path: '/graphql' })

sequelize.sync().then(async () => {
    app.listen({ port: 8000 }, () => {
        console.log('Apollo Server on localhost:8000/graphql')
    })
})

/*
const createUsersWithMessages = async date => {
    await models.User.create(
        {
            username: 'foo',
            email: 'foo@email.com',
            password: 'foo123456',
            role: 'ADMIN',
            messages: [
                {
                    text: 'message 1a',
                    createdAt: date.setSeconds(date.getSeconds() + 1)
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
                    createdAt: date.setSeconds(date.getSeconds() + 1)
                },
                {
                    text: 'message 2b',
                    createdAt: date.setSeconds(date.getSeconds() + 1)
                },
            ],
        },
        {
            include: [models.Message],
        },
    )
}
*/