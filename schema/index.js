const { gql } = require('apollo-server-express')

const Users = require('./users')
const Groups = require('./groups')
const Albums = require('./albums')
const Artists = require('./artists')
const Birthplaces = require('./birthplaces')
const Dance = require('./dance')
const Intangibles = require('./intangibles')
const LevelHistories = require('./level_histories')
const Personality = require('./personality')
const Songs = require('./songs')
const Trainers = require('./trainers')
const Visuals = require('./visuals')
const Vocals = require('./vocals')
const AlbumContributions = require('./album_contributions')

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

module.exports = [
    schema,
    Users,
    Groups,
    Albums,
    Artists,
    Birthplaces,
    Dance,
    Intangibles,
    LevelHistories,
    Personality,
    Songs,
    Trainers,
    Visuals,
    Vocals,
    AlbumContributions
]