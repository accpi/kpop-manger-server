const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres'
    }
)

const models = {
    User: sequelize.import('./users'),
    Message: sequelize.import('./messages'),
    Artist: sequelize.import('./artists'),
    Birthplace: sequelize.import('./birthplaces'),
    Group: sequelize.import('./groups'),
    VocalSkill: sequelize.import('./vocalSkills'),
    VisualSkill: sequelize.import('./visualSkills'),
    DanceSkill: sequelize.import('./danceSkills'),
    PersonalitySkill: sequelize.import('./personalitySkills'),
    IntangibleSkill: sequelize.import('./intangiblesSkills'),
    Song: sequelize.import('./songs'),
    Album: sequelize.import('./albums'),
    AlbumContribution: sequelize.import('./albumContributions'),
    LevelHistory: sequelize.import('./levelHistories'),
    Trainer: sequelize.import('./trainers')
}

Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models)
    }
})

module.exports = { sequelize, models }