const { GraphQLDateTime } = require('graphql-iso-date')

const customScalarResolver = {
    Date: GraphQLDateTime,
}

const userResolvers = require('./users')
const messageResolvers = require('./messages')
const danceSkillResolvers = require('./danceSkills')

module.exports = [customScalarResolver, userResolvers, messageResolvers, danceSkillResolvers]