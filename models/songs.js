const { pool } = require('../db_config')

class API {
	async get() {
        try {
            const result = await pool.query(`
                SELECT *
                FROM songs
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
                FROM songs
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

    async post({ name, album_id }) {
        try {
            const result = await pool.query(`
                INSERT INTO songs (name, album_id)
                VALUES ($1, $2)
                RETURNING *
                `, 
                [name, album_id]
            )
            
            return result.rows
                    ? result.rows[0]
                    : []
        } catch (error) {
            console.log(error.stack)
        }
    }

    async update({ id, name, album_id }) {
        try {
            const result = await pool.query(`
                UPDATE songs
                SET (name, album_id, modified_date) = 
                    ($2, $3, (to_timestamp(${Date.now()} / 1000.0)))
                WHERE id = $1
                RETURNING *
                `, 
                [id, name, album_id]
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
                DELETE FROM songs
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