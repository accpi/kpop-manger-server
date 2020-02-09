const { pool } = require('../db_config')

class API {
	async get() {
        try {
            const result = await pool.query(`
                SELECT *
                FROM level_histories
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
                FROM level_histories
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

    async post({ 
        artist_id, level,
        pretty, sexy, cute, elegant, cool,
        breathing, diction, range, control, empathy,
        balance, posture, coordination, flexibility, strength,
        funny, cuteness, charisma, outgoing, pleasant,
        songwriting, composition, choreography
    }) {
        try {
            const result = await pool.query(`
                INSERT INTO level_histories (
                    artist_id, level,
                    pretty, sexy, cute, elegant, cool,
                    breathing, diction, range, control, empathy,
                    balance, posture, coordination, flexibility, strength,
                    funny, cuteness, charisma, outgoing, pleasant,
                    songwriting, composition, choreography
                )
                VALUES (
                    $1, $2, 
                    $3, $4, $5, $6, $7,
                    $8, $9, $10, $11, $12,
                    $13, $14, $15, $16, $17,
                    $18, $19, $20, $21, $22,
                    $23, $24, $25
                )
                RETURNING *
                `, 
                [
                    artist_id, level,
                    pretty, sexy, cute, elegant, cool,
                    breathing, diction, range, control, empathy,
                    balance, posture, coordination, flexibility, strength,
                    funny, cuteness, charisma, outgoing, pleasant,
                    songwriting, composition, choreography
                ]
            )
            
            return result.rows
                    ? result.rows[0]
                    : []
        } catch (error) {
            console.log(error.stack)
        }
    }

    async update({ 
        id, artist_id, level,
        pretty, sexy, cute, elegant, cool,
        breathing, diction, range, control, empathy,
        balance, posture, coordination, flexibility, strength,
        funny, cuteness, charisma, outgoing, pleasant,
        songwriting, composition, choreography
    }) {
        try {
            const result = await pool.query(`
                UPDATE level_histories
                SET (                    
                        artist_id, level,
                        pretty, sexy, cute, elegant, cool,
                        breathing, diction, range, control, empathy,
                        balance, posture, coordination, flexibility, strength,
                        funny, cuteness, charisma, outgoing, pleasant,
                        songwriting, composition, choreography, 
                        modified_date
                    ) = 
                    (
                        $2, $3, 
                        $4, $5, $6, $7, $8,
                        $9, $10, $11, $12, $13,
                        $14, $15, $16, $17, $18,
                        $19, $20, $21, $22, $23,
                        $24, $25, $26,
                        (to_timestamp(${Date.now()} / 1000.0))
                    )
                WHERE id = $1
                RETURNING *
                `, 
                [
                    id, artist_id, level,
                    pretty, sexy, cute, elegant, cool,
                    breathing, diction, range, control, empathy,
                    balance, posture, coordination, flexibility, strength,
                    funny, cuteness, charisma, outgoing, pleasant,
                    songwriting, composition, choreography
                ]
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
                DELETE FROM level_histories
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