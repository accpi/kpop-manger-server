const { pool } = require('../db_config')

class API {
	async get() {
        try {
            const result = await pool.query(`
                SELECT *
                FROM vocal_skills
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
                FROM vocal_skills
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

    async post({ artist_id, breathing, diction, range, control, empathy }) {
        try {
            const result = await pool.query(`
                INSERT INTO vocal_skills (artist_id, breathing, diction, range, control, empathy)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *
                `, 
                [artist_id, breathing, diction, range, control, empathy]
            )
            
            return result.rows
                    ? result.rows[0]
                    : []
        } catch (error) {
            console.log(error.stack)
        }
    }

    async update({ id, artist_id, breathing, diction, range, control, empathy, pity_timer }) {
        try {
            const result = await pool.query(`
                UPDATE vocal_skills
                SET (artist_id, breathing, diction, range, control, empathy, pity_timer, modified_date) = 
                    ($2, $3, $4, $5, $6, $7, (to_timestamp(${Date.now()} / 1000.0)))
                WHERE id = $1
                RETURNING *
                `, 
                [id, artist_id, breathing, diction, range, control, empathy, pity_timer]
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
                DELETE FROM vocal_skills
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
        console.log(level)
        const vocals = await this.post({
            artist_id: artist_id,
            breathing: 0,
            diction: 0,
            range: 0,
            control: 0,
            empathy: 0
        })
        return vocals
    }
}

module.exports = API