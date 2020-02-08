const { pool } = require('../db_config')

class API {
	async get() {
        try {
            const result = await pool.query(`
                SELECT *
                FROM albums
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
                FROM albums
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

    async post({ group_id, name, genre, style }) {
        try {
            const result = await pool.query(`
                INSERT INTO albums (group_id, name, genre, style)
                VALUES ($1, $2, $3, $4)
                RETURNING *
                `, 
                [group_id, name, genre, style]
            )
            
            return result.rows
                    ? result.rows[0]
                    : []
        } catch (error) {
            console.log(error.stack)
        }
    }

    async update({ id, group_id, name, genre, style }) {
        try {
            const result = await pool.query(`
                UPDATE albums
                SET (group_id, name, genre, style, modified_date) = ($2, $3, $4, $5, (to_timestamp(${Date.now()} / 1000.0)))
                WHERE id = $1
                RETURNING *
                `, 
                [id, group_id, name, genre, style]
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
                DELETE FROM albums
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