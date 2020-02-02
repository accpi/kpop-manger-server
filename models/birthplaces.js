const model = (sequelize, DataTypes) => {
    const Model = sequelize.define('birthplace', {
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        country: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
    })

    return Model
}

module.exports = model