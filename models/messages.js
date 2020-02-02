const message = (sequelize, DataTypes) => {
    const Message = sequelize.define('message', {
        text: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Message text must not be empty',
                },
            },
        },
    })

    Message.associate = models => {
        Message.belongsTo(models.User)
    }

    return Message
}

module.exports = message