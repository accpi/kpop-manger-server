const { pool } = require('../db_config')

class API {
	async get() {
        try {
            const result = await pool.query(`
                SELECT *
                FROM trainers
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
                FROM trainers
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

    async post({ first_name, last_name, dance, vocals, personality, visuals }) {
        try {
            const result = await pool.query(`
                INSERT INTO trainers (first_name, last_name, dance, vocals, personality, visuals)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *
                `, 
                [first_name, last_name, dance, vocals, personality, visuals]
            )
            
            return result.rows
                    ? result.rows[0]
                    : []
        } catch (error) {
            console.log(error.stack)
        }
    }

    async update({ id, first_name, last_name, dance, vocals, personality, visuals }) {
        try {
            const result = await pool.query(`
                UPDATE trainers
                SET (first_name, last_name, dance, vocals, personality, visuals, modified_date) = 
                    ($2, $3, $4, $5, $6, $7, (to_timestamp(${Date.now()} / 1000.0)))
                WHERE id = $1
                RETURNING *
                `, 
                [id, first_name, last_name, dance, vocals, personality, visuals]
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
                DELETE FROM trainers
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
}

module.exports = API