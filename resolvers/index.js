const { GraphQLDateTime } = require('graphql-iso-date')

const customScalarResolver = {
    Date: GraphQLDateTime,
}

const users = require('./users')
const album_contributions = require('./album_contributions')
const albums = require('./albums')
const artists = require('./artists')
const birthplaces = require('./birthplaces')
const dance = require('./dance')
const groups = require('./groups')
const intangibles = require('./intangibles')
const level_histories = require('./level_histories')
const personality = require('./personality')
const songs = require('./songs')
const trainers = require('./trainers')
const visuals = require('./visuals')
const vocals = require('./vocals')

module.exports = [
    customScalarResolver, 
    users,
    album_contributions,
    albums,
    artists,
    birthplaces,
    dance,
    groups,
    intangibles,
    level_histories,
    personality,
    songs,
    trainers,
    visuals,
    vocals
]