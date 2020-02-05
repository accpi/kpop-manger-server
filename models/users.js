const { pool } = require('../db_config')

class UserAPI {
	async getAll() {
        try {
            const res = await pool.query(`
                                            SELECT *
                                            FROM users
                                            ORDER BY id ASC
                                        `)
            return res.rows
        } catch (error) {
            console.log(error.stack)
        }

    }

    async getByID({ id }) {
        try {
            const res = await pool.query(`
                                            SELECT *
                                            FROM users
                                            WHERE id = $1
                                            ORDER BY id ASC
                                        `, 
                                        [id]
                                        )
                                        
            return res.rows[0]
        } catch (error) {
            console.log(error.stack)
        }

    }
    
    /*
    UserAPI.prototype.generatePasswordHash = async function() {
        const saltRounds = 10
        return await bcrypt.hash(this.password, saltRounds)
    }

    UserAPI.prototype.validatePassword = async function (password) {
        return await bcrypt.compare(password, this.password)
    }
    */

    userReducer(user) {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
    }
}

module.exports = UserAPI