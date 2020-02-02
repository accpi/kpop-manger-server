const { combineResolvers } = require('graphql-resolvers')
const { isAuthenticated, isMessageOwner } = require('./authorization')

const resolvers = {
    Query: {
        danceSkills: async (parent, args, { models }) => {
            return await models.DanceSkill.findAll()
        },
        danceSkill: async (parent, { id }, { models }) => {
            return await models.DanceSkill.findByPk(id)
        },
    },

    Mutation: {
        createDanceSkill: combineResolvers(
            isAuthenticated,
            async (parent, { artistId, balance, posture, coordination, flexibility, strength }, { me, models }) => {
                try {
                    return await models.DanceSkill.create({
                        artistId, balance, posture, coordination, flexibility, strength
                    })
                }
                catch (error) {
                    throw new Error(error)
                }
            }
        ),

        updateDanceSkill: combineResolvers(
            isAuthenticated,
            async (parent, { id, artistId, balance, posture, coordination, flexibility, strength, pityTimer }, { models }) => {
                try {
                    const danceSkill = await models.DanceSkill.findByPk(id)

                    danceSkill.artistId = artistId
                    danceSkill.balance = balance
                    danceSkill.posture = posture
                    danceSkill.coordination = coordination
                    danceSkill.flexibility = flexibility
                    danceSkill.strength = strength
                    danceSkill.pityTimer = pityTimer

                    return await danceSkill.save()
                }
                catch (error) {
                    throw new Error(error)
                }
            }
        ),
        deleteDanceSkill: combineResolvers(
            isAuthenticated,
            isMessageOwner,
            async (parent, { id }, { models }) => {
                try {
                    return await models.DanceSkill.destroy({
                        where: { id }
                    })
                }
                catch (error) {
                    throw new Error(error)
                }
            }
        ),
    },

    DanceSkill: {
        user: async (message, args, { models }) => {
            return await models.User.findByPk(message.user_id)
        }
    },
}

module.exports = resolvers