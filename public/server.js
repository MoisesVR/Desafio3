const cors = require('cors');
const { obtenerPost, agregarPost } = require('./db')
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
    const posts = await obtenerPost();
    res.json(posts);
})