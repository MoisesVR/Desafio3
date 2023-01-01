require('dotenv').config()
const { Pool } = require('pg')

const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    allowExitOnIdle: true
})

const obtenerPost = async () => {
    try {
        const { rows } = await pool.query("SELECT * FROM posts");
        console.log(rows);
        return rows;
    } catch (e) {
        console.log("Error al traer los datos", e.message)
    }

}

module.exports = pool;
module.exports = { obtenerPost };