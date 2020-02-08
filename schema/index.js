const { gql } = require('apollo-server-express')

const Users = require('./users')
const Groups = require('./groups')
const Albums = require('./albums')
const Artists = require('./artists')
const Birthplaces = require('./birthplaces')
/*



const DanceSkills = require('./danceSkills')
const IntangibleSkills = require('./intangiblesSkills')
const LevelHistories = require('./levelHistories')
const PersonalitySkills = require('./personalitySkills')
const Songs = require('./songs')
const Trainers = require('./trainers')
const VisualSkills = require('./visualSkills')
const VocalSkills = require('./vocalSkills')

*/

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
    Birthplaces
]