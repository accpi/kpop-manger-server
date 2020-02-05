const UserAPI = require('./users')

const dataSources = () => ({
	UserAPI: new UserAPI(),
})

module.exports = dataSources