const { GraphQLDateTime } = require('graphql-iso-date')

const customScalarResolver = {
    Date: GraphQLDateTime,
}

const userResolvers = require('./users')
const messageResolvers = require('./messages')

module.exports = [customScalarResolver, userResolvers, messageResolvers]