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

const agregarPost = async (payload) => {
    const SQLquery = {
        text: 'INSERT INTO posts (titulo, img, descripcion, likes) VALUES($1,$2,$3,$4) RETURNING *',
        values: [
            payload.titulo,
            payload.url,
            payload.descripcion,
            payload.likes
        ]
    }
    try {
        if(payload.url === payload.url){
            console.log("La imagen ya existe")
        }
        const result = await pool.query(SQLquery)
        return result.rows
    } catch (e) {
        console.log("error al insertar datos en tabla posts:", e.message)
    }
}

module.exports = pool;
module.exports = { obtenerPost, agregarPost };