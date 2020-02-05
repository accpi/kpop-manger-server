const { ForbiddenError } = require('apollo-server')
const { combineResolvers, skip } = require('graphql-resolvers')

const isAuthenticated = (parent, args, { me }) => 
    me ? skip : new ForbiddenError('Not logged in.')

const isAdmin = combineResolvers(
    isAuthenticated,
    (parent, args, { me: { role } }) => {
        if (role === 'ADMIN') {
            return skip
        }
        else {
            return new ForbiddenError('Not authorized as admin')
        }
    }
)

module.exports = { isAuthenticated, isAdmin }