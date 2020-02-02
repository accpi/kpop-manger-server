const model = (sequelize, DataTypes) => {
    const Model = sequelize.define('albumContribution', {
        points: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    })

    Model.associate = models => {
        Model.belongsTo(models.Album)
        Model.belongsTo(models.Artist)
    }

    return Model
}

module.exports = model