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
            { first_name, last_name, stage_name, birthday, sex, exp, user_id, birthplace_id, group_id, level },
            { dataSources },
        ) => {
            const artist = await dataSources.ArtistAPI.post({
                first_name, last_name, stage_name, birthday, sex, exp, user_id, birthplace_id, group_id
            })

            const artist_level = 0
            if (level) {
                artist_level = level
            }

            const vocals = await dataSources.VocalAPI.generateNew({ artist_id: artist.id, level: artist_level })
            const visuals = await dataSources.VisualAPI.generateNew({ artist_id: artist.id, level: artist_level })
            const dance = await dataSources.DanceAPI.generateNew({ artist_id: artist.id, level: artist_level })
            const personality = await dataSources.PersonalityAPI.generateNew({ artist_id: artist.id, level: artist_level })
            const intangbiles = await dataSources.IntangibleAPI.generateNew({ artist_id: artist.id, level: artist_level })
            
            console.log({
                artist: artist,
                vocals: vocals,
                visuals: visuals,
                dance: dance,
                personality: personality,
                intangibles: intangbiles
            })
            
            return artist
        },

        updateArtist: async (
            _,
            { id, first_name, last_name, stage_name, birthday, sex, exp, user_id, birthplace_id, group_id  },
            { dataSources },
        ) => {
            return await dataSources.ArtistAPI.update({
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
        group: async (artist, __, { dataSources }) => {
            const groups = await dataSources.GroupAPI.get()
            return await groups.find(group => 
                artist.group_id === group.id
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
        birthplace: async (artist, __, { dataSources }) => {
            const birthplaces = await dataSources.BirthplaceAPI.get()
            return await birthplaces.find(birthplace => 
                artist.birthplace_id === birthplace.id
            )
        },
    }
}

module.exports = resolvers