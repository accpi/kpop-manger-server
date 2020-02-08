const { pool } = require('../db_config')

class API {
	async get() {
        try {
            const result = await pool.query(`
                SELECT *
                FROM album_contributions
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
                FROM album_contributions
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

    async post({ artist_id, album_id, visuals, vocals, dance, personality }) {
        try {
            const result = await pool.query(`
                INSERT INTO album_contributions (artist_id, album_id, visuals, vocals, dance, personality)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *
                `, 
                [artist_id, album_id, visuals, vocals, dance, personality]
            )
            
            return result.rows
                    ? result.rows[0]
                    : []
        } catch (error) {
            console.log(error.stack)
        }
    }

    async update({ id, artist_id, album_id, visuals, vocals, dance, personality }) {
        try {
            const result = await pool.query(`
                UPDATE album_contributions
                SET (username, email, password, first_name, last_name, role, modified_date) = ($2, $3, $4, $5, $6, $7, (to_timestamp(${Date.now()} / 1000.0)))
                WHERE id = $1
                RETURNING *
                `, 
                [id, artist_id, album_id, visuals, vocals, dance, personality]
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
                DELETE FROM album_contributions
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