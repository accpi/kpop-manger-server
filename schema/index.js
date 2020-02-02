const { gql } = require('apollo-server-express')

const UserSchema = require('./users')
const MessageSchema = require('./messages')
const DanceSkillSchema = require('./danceSkills')

const schema = gql`
    scalar Date

    type Query {
        _: Boolean
    }

    type Mutation {
        _: Boolean
    }
    
    type Subscription {
        _: Boolean
    }
`

module.exports = [schema, UserSchema, MessageSchema, DanceSkillSchema]