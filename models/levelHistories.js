const model = (sequelize, DataTypes) => {
    const Model = sequelize.define('levelHistories', {
        points: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    })

    Model.associate = models => {
    }

    return Model
}

module.exports = model