const model = (sequelize, DataTypes) => {
    const Model = sequelize.define('artist', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        stageName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Date.now(), 
            validate: {
                notEmpty: true,
            },
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: Date.now(),
            validate: {
                notEmpty: true,
            }
        },
    })

    Model.associate = models => {
        Model.belongsTo(models.User),
        Model.belongsTo(models.Group),
        Model.hasMany(models.AlbumContribution),
        Model.hasMany(models.LevelHistory),
        Model.hasOne(models.DanceSkill),
        Model.hasOne(models.VocalSkill),
        Model.hasOne(models.VisualSkill),
        Model.hasOne(models.PersonalitySkill),
        Model.hasOne(models.IntangibleSkill),
        Model.hasOne(models.Birthplace)
    }

    return Model
}

module.exports = model