const { pool } = require('../db_config')

class API {
	async get() {
        try {
            const result = await pool.query(`
                SELECT *
                FROM dance_skills
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
                FROM dance_skills
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

    async post({ artist_id, balance, posture, coordination, flexibility, strength }) {
        try {
            const result = await pool.query(`
                INSERT INTO dance_skills (artist_id, balance, posture, coordination, flexibility, strength)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *
                `, 
                [artist_id, balance, posture, coordination, flexibility, strength]
            )
            
            return result.rows
                    ? result.rows[0]
                    : []
        } catch (error) {
            console.log(error.stack)
        }
    }

    async update({ id, artist_id, balance, posture, coordination, flexibility, strength, pity_timer }) {
        try {
            const result = await pool.query(`
                UPDATE dance_skills
                SET (artist_id, balance, posture, coordination, flexibility, strength, pity_timer, modified_date) = 
                    ($2, $3, $4, $5, $6, $7, (to_timestamp(${Date.now()} / 1000.0)))
                WHERE id = $1
                RETURNING *
                `, 
                [id, artist_id, balance, posture, coordination, flexibility, strength, pity_timer]
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
                DELETE FROM dance_skills
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