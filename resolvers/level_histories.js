const { combineResolvers } = require('graphql-resolvers')
const { isAuthenticated, isAdmin } = require('./authorization')

const resolvers = {
    Query: {
        levelHistories: async (_, __, { dataSources }) => {
            return await dataSources.LevelHistoryAPI.get()
        },
        levelHistory: async (_, { id }, { dataSources }) => {
            return await dataSources.LevelHistoryAPI.getByID({ id })
        },
    },

    Mutation: {
        createLevelHistory: async (
            _,
            { 
                artist_id, level, 
                pretty, sexy, cute, elegant, cool,
                breathing, diction, range, control, empathy,
                balance, posture, coordination, flexibility, strength,
                funny, cuteness, charisma, outgoing, pleasant,
                songwriting, composition, choreography 
            },
            { dataSources },
        ) => {
            return await dataSources.LevelHistoryAPI.post({
                artist_id, level, 
                pretty, sexy, cute, elegant, cool,
                breathing, diction, range, control, empathy,
                balance, posture, coordination, flexibility, strength,
                funny, cuteness, charisma, outgoing, pleasant,
                songwriting, composition, choreography 
            })
        },

        updateLevelHistory: async (
            _,
            { 
                id, artist_id, level, 
                pretty, sexy, cute, elegant, cool,
                breathing, diction, range, control, empathy,
                balance, posture, coordination, flexibility, strength,
                funny, cuteness, charisma, outgoing, pleasant,
                songwriting, composition, choreography  
            },
            { dataSources },
        ) => {
            return await dataSources.LevelHistoryAPI.update({
                id, artist_id, level, 
                pretty, sexy, cute, elegant, cool,
                breathing, diction, range, control, empathy,
                balance, posture, coordination, flexibility, strength,
                funny, cuteness, charisma, outgoing, pleasant,
                songwriting, composition, choreography 
            })
        },

        deleteLevelHistory: combineResolvers(
            isAdmin,
            async (
                    _,
                    { id },
                    { dataSources },
                ) => {
                    return await dataSources.LevelHistoryAPI.delete({
                        id
            })
        }),
    },

    LevelHistory: {
        artist: async (levelHistory, __, { dataSources }) => {
            const artists = await dataSources.ArtistAPI.get()
            return await artists.find(artist => 
                levelHistory.artist_id === artist.id
            )
        },
    }
}

module.exports = resolvers