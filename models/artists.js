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
        Model.belongsTo(models.User)
    }

    return Model
}

module.exports = model