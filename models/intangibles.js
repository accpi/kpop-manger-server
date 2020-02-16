const { pool } = require('../db_config')

class API {
	async get() {
        try {
            const result = await pool.query(`
                SELECT *
                FROM intangible_skills
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
                FROM intangible_skills
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

    async post({ artist_id, stamina, morale, songwriting, composition, choreography }) {
        try {
            const result = await pool.query(`
                INSERT INTO intangible_skills (artist_id, stamina, morale, songwriting, composition, choreography)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *
                `, 
                [artist_id, stamina, morale, songwriting, composition, choreography]
            )
            
            return result.rows
                    ? result.rows[0]
                    : []
        } catch (error) {
            console.log(error.stack)
        }
    }

    async update({ id, artist_id, stamina, morale, songwriting, composition, choreography, pity_timer }) {
        try {
            const result = await pool.query(`
                UPDATE intangible_skills
                SET (artist_id, stamina, morale, songwriting, composition, choreography, pity_timer, modified_date) = 
                    ($2, $3, $4, $5, $6, $7, (to_timestamp(${Date.now()} / 1000.0)))
                WHERE id = $1
                RETURNING *
                `, 
                [id, artist_id, stamina, morale, songwriting, composition, choreography, pity_timer]
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
                DELETE FROM intangible_skills
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
            stamina: 100,
            morale: 100,
            songwriting: 0,
            composition: 0,
            choreography: 0
        })
        return vocals
    }
}

module.exports = API