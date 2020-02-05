const { GraphQLDateTime } = require('graphql-iso-date')

const customScalarResolver = {
    Date: GraphQLDateTime,
}

const userResolvers = require('./users')

module.exports = [customScalarResolver, userResolvers]