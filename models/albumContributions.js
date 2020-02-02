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
        AlbumContribution.belongsTo(models.Album)
        AlbumContribution.belongsTo(models.Artist)
    }

    return Model
}

module.exports = model