const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let inventario = [];

app.get('/api/inventario', (req, res) => {
    res.json(inventario);
});

app.post('/api/inventario', (req, res) => {
    const producto = req.body;
    inventario.push(producto);
    res.status(201).json(producto);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});