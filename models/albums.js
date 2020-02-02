const model = (sequelize, DataTypes) => {
    const Model = sequelize.define('album', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    })

    Model.associate = models => {
        Model.belongsTo(models.Group),
        Model.hasMany(models.Song)
    }

    return Model
}

module.exports = model