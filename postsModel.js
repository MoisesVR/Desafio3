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
        text: 'INSERT INTO posts (titulo, img, descripcion, likes) VALUES($1,$2,$3,0) RETURNING *',
        values: [
            payload.titulo,
            payload.url,
            payload.descripcion,
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

const editPost = async (id,payload) => {
    const SQLquery = {
        text: 'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *',
        values: [
            id
        ]
    }
    try {
        const result = await pool.query(SQLquery)
        return result.rows
    } catch (e) {
        console.log(e.message)
    }
}

const deletePost = async (id,payload) => {
    const SQLquery = {
        text: 'DELETE FROM posts WHERE id = $1',
        values: [
            id
        ]
    }
    try {
        const result = await pool.query(SQLquery)
        return result.rows
    } catch (e) {
        console.log(e.message)
    }
}

module.exports = { getPost, addPost, editPost, deletePost };