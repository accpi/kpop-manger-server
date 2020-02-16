const { pool } = require('../db_config')

class API {
	async get() {
        try {
            const result = await pool.query(`
                SELECT *
                FROM visual_skills
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
                FROM visual_skills
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

    async post({ artist_id, pretty, sexy, cute, elegant, cool }) {
        try {
            const result = await pool.query(`
                INSERT INTO visual_skills (artist_id, pretty, sexy, cute, elegant, cool)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *
                `, 
                [artist_id, pretty, sexy, cute, elegant, cool]
            )
            
            return result.rows
                    ? result.rows[0]
                    : []
        } catch (error) {
            console.log(error.stack)
        }
    }

    async update({ id, artist_id, pretty, sexy, cute, elegant, cool, pity_timer }) {
        try {
            const result = await pool.query(`
                UPDATE visual_skills
                SET (artist_id, pretty, sexy, cute, elegant, cool, pity_timer, modified_date) = 
                    ($2, $3, $4, $5, $6, $7, (to_timestamp(${Date.now()} / 1000.0)))
                WHERE id = $1
                RETURNING *
                `, 
                [id, artist_id, pretty, sexy, cute, elegant, cool, pity_timer]
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
                DELETE FROM visual_skills
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

    async generateNew({artist_id, level}) {
        const vocals = await this.post({
            artist_id: artist_id,
            pretty: 0,
            sexy: 0,
            cute: 0,
            elegant: 0,
            cool: 0
        })
        return vocals
    }
}

module.exports = API