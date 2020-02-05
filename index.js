require('dotenv').config()

// SERVER DEPENDANCIES
const express = require('express')
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express')
const jwt = require('jsonwebtoken')
// END SERVER DEPENDANCIES

// APOLLO
const schema = require('./schema')
const resolvers = require('./resolvers')
const dataSources = require('./models')
// END APOLLO


const app = express()
app.use(cors())

// LOGGING
/*
const pino = require('pino')
const logger = pino({ 
    level: process.env.LOG_LEVEL || 'DEBUG',
    prettyPrint: true // remove in production
})

const expressPino = require('express-pino-logger')
const expressLogger = expressPino({ logger })
app.use(expressLogger)
*/
// END LOGGING


const getMe = async req => {
    const token = req.headers['x-token']

    if (token) {
        try {
            return await jwt.verify(token, process.env.JWT_SECRET)
        }
        catch (error) {
            throw new Error(
                'Your session has expired. Sign in again.'
            )
        }
    }
}

const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    dataSources,
    context: async ({ req }) => {
        const me = await getMe(req)
    
        return  {
            me,
            secret: process.env.JWT_SECRET
        }
    }, 
})

server.applyMiddleware({ app, path: '/graphql' })

app.listen({ port: 8000 }, () => {
    console.log('Apollo Server on localhost:8000/graphql')
})