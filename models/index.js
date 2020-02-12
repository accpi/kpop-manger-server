const Users = require('./users')
const AlbumContributions = require('./album_contributions')
const Albums = require('./albums')
const Artists = require('./artists')
const Birthplaces = require('./birthplaces')
const Dance = require('./dance')
const Groups = require('./groups')
const Intangibles = require('./intangibles')
const LevelHistories = require('./level_histories')
const Personality = require('./personality')
const Songs = require('./songs')
const Trainers = require('./trainers')
const Visuals = require('./visuals')
const Vocals = require('./vocals')

const dataSources = () => ({
	UserAPI: new Users(),
	AlbumContributionAPI: new AlbumContributions(),
	AlbumAPI: new Albums(),
	ArtistAPI: new Artists(),
	BirthplaceAPI: new Birthplaces(),
	DanceAPI: new Dance(),
	GroupAPI: new Groups(),
	IntangibleAPI: new Intangibles(),
	LevelHistoryAPI: new LevelHistories(),
	PersonalityAPI: new Personality(),
	SongAPI: new Songs(),
	TrainerAPI: new Trainers(),
	VisualAPI: new Visuals(),
	VocalAPI: new Vocals(),
})

module.exports = dataSources