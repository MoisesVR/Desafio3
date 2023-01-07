const cors = require('cors');
const { getPost, addPost } = require('./db')
const express = require('express');
const app = express();

app.use(cors());

app.use(express.json())

app.use(express.static('public'))

app.listen(3000, console.log("SERVIDOR ENCENDIDO"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.get("/posts", async (req, res) => {
    const posts = await getPost();
    res.json(posts);
})

app.post("/posts", async (req, res) => {
    const payload = req.body
    const posts = await getPost();
    let comparison = 0;

    if (payload.titulo && payload.url && payload.descripcion) {
        posts.forEach(post => {
            if (payload.url === post.img) {
                comparison = 1;
            } else {
                comparison = 0;
            }
        })
        if (comparison === 1) {
            res.status(400)
            res.send("La imagen ya existe")

        } else if (comparison === 0) {
            await addPost(payload);
            res.send("Post agregado con exito")
        }
    } else {
        res.status(400)
        res.send({ "Mensaje": "Hay campos vacios o la imagen ya existe" })
    }
})