const { pool } = require('../db_config')

class API {
	async get() {
        try {
            const result = await pool.query(`
                SELECT *
                FROM artists
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
                FROM artists
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

    async post({ first_name, last_name, stage_name, birthday, sex, exp, user_id, birthplace_id, group_id }) {
        try {
            const result = await pool.query(`
                INSERT INTO artists (first_name, last_name, stage_name, birthday, sex, exp, user_id, birthplace_id, group_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING *
                `, 
                [first_name, last_name, stage_name, birthday, sex, exp, user_id, birthplace_id, group_id]
            )
            
            return result.rows
                    ? result.rows[0]
                    : []
        } catch (error) {
            console.log(error.stack)
        }
    }

    async update({ id, first_name, last_name, stage_name, birthday, sex, exp, user_id, birthplace_id, group_id }) {
        try {
            const result = await pool.query(`
                UPDATE artists
                SET (first_name, last_name, stage_name, birthday, sex, exp, user_id, birthplace_id, group_id, modified_date) = 
                    ($2, $3, $4, $5, $6, $7, $8, $9, $10, (to_timestamp(${Date.now()} / 1000.0)))
                WHERE id = $1
                RETURNING *
                `, 
                [id, first_name, last_name, stage_name, birthday, sex, exp, user_id, birthplace_id, group_id]
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
                DELETE FROM artists
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