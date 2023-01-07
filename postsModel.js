const pool = require("./db").getInstance();

const getPost = async () => {
    try {
        const { rows } = await pool.query("SELECT * FROM posts");
        console.log(rows);
        return rows;
    } catch (e) {
        console.log("Error al traer los datos", e.message)
    }

}

const addPost = async (payload) => {
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

module.exports = { getPost, addPost };