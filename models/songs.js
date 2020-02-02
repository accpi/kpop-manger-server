const model = (sequelize, DataTypes) => {
    const Model = sequelize.define('song', {
        name: {
            type: DataTypes.STRING,
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