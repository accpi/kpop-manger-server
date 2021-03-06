const { pool } = require('../db_config')
const bcrypt = require('bcrypt')

class API {
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

    async post({ username, email, password, first_name, last_name, role }) {
        try {
            const result = await pool.query(`
                INSERT INTO users (username, email, password, first_name, last_name, role)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING *
                `, 
                [username, email, await generatePasswordHash(password), first_name, last_name, role]
            )
            
            return result.rows
                    ? result.rows[0]
                    : []
        } catch (error) {
            console.log(error.stack)
        }
    }

    async update({ id, username, email, password, first_name, last_name, role }) {
        try {
            const result = await pool.query(`
                UPDATE users
                SET (username, email, password, first_name, last_name, role, modified_date) = ($2, $3, $4, $5, $6, $7, (to_timestamp(${Date.now()} / 1000.0)))
                WHERE id = $1
                RETURNING *
                `, 
                [id, username, email, await generatePasswordHash(password), first_name, last_name, role]
            )
            
            return result.rows
                    ? result.rows[0]
                    : []
        } catch (error) {
            console.log(error.stack)
        }
    }

    async delete({ id }) {
        try {
            const result = await pool.query(`
                DELETE FROM users
                WHERE id = $1
                RETURNING *
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

module.exports = API