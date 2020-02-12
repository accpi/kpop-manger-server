const { combineResolvers } = require('graphql-resolvers')
const { isAuthenticated, isAdmin } = require('./authorization')

const resolvers = {
    Query: {
        artists: async (_, __, { dataSources }) => {
            return await dataSources.ArtistAPI.get()
        },
        artist: async (_, { id }, { dataSources }) => {
            return await dataSources.ArtistAPI.getByID({ id })
        },
    },

    Mutation: {
        createArtist: async (
            _,
            { first_name, last_name, stage_name, birthday, sex, exp, user_id, birthplace_id, group_id },
            { dataSources },
        ) => {
            return await dataSources.ArtistAPI.post({
                first_name, last_name, stage_name, birthday, sex, exp, user_id, birthplace_id, group_id
            })
        },

        updateArtist: async (
            _,
            { id, first_name, last_name, stage_name, birthday, sex, exp, user_id, birthplace_id, group_id  },
            { dataSources },
        ) => {
            return await dataSources.ArtistAPI.post({
                id, first_name, last_name, stage_name, birthday, sex, exp, user_id, birthplace_id, group_id 
            })
        },

        deleteArtist: combineResolvers(
            isAdmin,
            async (
                    _,
                    { id },
                    { dataSources },
                ) => {
                    return await dataSources.ArtistAPI.delete({
                        id
            })
        }),
    },

    Artist: {
        user: async (artist, __, { dataSources }) => {
            const users = await dataSources.UserAPI.get()
            return await users.find(user => 
                artist.user_id === user.id
            )
        },
        vocals: async (artist, __, { dataSources }) => {
            const vocals = await dataSources.VocalAPI.get()
            return await vocals.find(vocal => 
                artist.id === vocal.artist_id
            )
        },
        visuals: async (artist, __, { dataSources }) => {
            const visuals = await dataSources.VisualAPI.get()
            return await visuals.find(visual => 
                artist.id === visual.artist_id
            )
        },
        dance: async (artist, __, { dataSources }) => {
            const dances = await dataSources.DanceAPI.get()
            return await dances.find(dance => 
                artist.id === dance.artist_id
            )
        },
        personality: async (artist, __, { dataSources }) => {
            const personalities = await dataSources.PersonalityAPI.get()
            return await personalities.find(personality => 
                artist.id === personality.artist_id
            )
        },
        intangibles: async (artist, __, { dataSources }) => {
            const intangibles = await dataSources.IntangibleAPI.get()
            return await intangibles.find(intangbile => 
                artist.id === intangbile.artist_id
            )
        },
        level_histories: async (artist, __, { dataSources }) => {
            const levelHistories = await dataSources.LevelHistoryAPI.get()
            return await levelHistories.filter(levelHistory => 
                artist.id === levelHistory.artist_id
            )
        },
        album_contributions: async (artist, __, { dataSources }) => {
            const albumContributions = await dataSources.AlbumContributionAPI.get()
            return await albumContributions.filter(albumContribution => 
                artist.id === albumContribution.artist_id
            )
        },
    }
}

module.exports = resolvers