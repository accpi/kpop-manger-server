const { pool } = require('../db_config')

class API {
	async get() {
        try {
            const result = await pool.query(`
                SELECT *
                FROM personality_skills
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
                FROM personality_skills
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

    async post({ artist_id, funny, cuteness, charisma, outgoing, pleasant }) {
        try {
            const result = await pool.query(`
                INSERT INTO personality_skills (artist_id, funny, cuteness, charisma, outgoing, pleasant)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *
                `, 
                [artist_id, funny, cuteness, charisma, outgoing, pleasant]
            )
            
            return result.rows
                    ? result.rows[0]
                    : []
        } catch (error) {
            console.log(error.stack)
        }
    }

    async update({ id, artist_id, funny, cuteness, charisma, outgoing, pleasant, pity_timer }) {
        try {
            const result = await pool.query(`
                UPDATE personality_skills
                SET (artist_id, funny, cuteness, charisma, outgoing, pleasant, pity_timer, modified_date) = 
                    ($2, $3, $4, $5, $6, $7, (to_timestamp(${Date.now()} / 1000.0)))
                WHERE id = $1
                RETURNING *
                `, 
                [id, artist_id, funny, cuteness, charisma, outgoing, pleasant, pity_timer]
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
                DELETE FROM personality_skills
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