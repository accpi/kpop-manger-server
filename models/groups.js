const model = (sequelize, DataTypes) => {
    const Model = sequelize.define('group', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        fanName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    })

    Model.associate = models => {
        Model.belongsTo(models.User),
        Model.hasMany(models.Artist),
        Model.hasMany(models.Album)
    }

    return Model
}

module.exports = model