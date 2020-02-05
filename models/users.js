const { pool } = require('../db_config')
const bcrypt = require('bcrypt')

class UserAPI {
	async get() {
        try {
            const result = await pool.query(`
                SELECT *
                FROM users
                ORDER BY id ASC
            `)

            return result.rows
                    ? result.rows
                    : []
        } catch (error) {
            console.log(error.stack)
        }
    }

    async getByID({ id }) {
        try {
            const result = await pool.query(`
                SELECT *
                FROM users
                WHERE id = $1
                ORDER BY id ASC
                `, 
                [id]
            )
                                        
            return result.rows
                    ? result.rows[0]
                    : []
        } catch (error) {
            console.log(error.stack)
        }
    }

    async post({ username, email, password, firstName, lastName }) {
        try {
            const result = await pool.query(`
                INSERT INTO users (username, email, password, first_name, last_name)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *
                `, 
                [username, email, await generatePasswordHash(password), firstName, lastName]
            )
            
            return result.rows
                    ? result.rows[0]
                    : []
        } catch (error) {
            console.log(error.stack)
        }
    }

    async update({ username, email, password, firstName, lastName }) {
        try {
            const result = await pool.query(`
                UPDATE users
                SET (email, password, first_name, last_name, updated_at) = ($2, $3, $4, $5, (to_timestamp(${Date.now()} / 1000.0)))
                WHERE username = $1
                RETURNING *
                `, 
                [username, email, await generatePasswordHash(password), firstName, lastName]
            )
            
            return result.rows
                    ? result.rows[0]
                    : []
        } catch (error) {
            console.log(error.stack)
        }
    }

    async delete({ username }) {
        try {
            const result = await pool.query(`
                DELETE FROM users
                WHERE username = $1
                RETURNING *
                `, 
                [username]
            )
            
            return result.rows
                    ? result.rows[0]
                    : []
        } catch (error) {
            console.log(error.stack)
        }
    }

    async login({ email }) {
        try {
            const result = await pool.query(`
                SELECT *
                FROM users
                WHERE email = $1
                `, 
                [email]
            )
            
            return result.rows
                    ? result.rows[0]
                    : []
        } catch (error) {
            console.log(error.stack)
        }
    }
}

async function generatePasswordHash(password) {
    return await bcrypt.hash(password, 10)
}

module.exports = UserAPI