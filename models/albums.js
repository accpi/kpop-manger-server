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
    }

    return Model
}

module.exports = model