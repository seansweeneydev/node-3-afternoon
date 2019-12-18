require ('dotenv').config()
const express = require('express');
      massive = require('massive');
const products_controller = require('./products_controller')

const app = express();

const {SERVER_PORT, CONNECTION_STRING} = process.env

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
})
.catch(err => console.log(err));

app.use(express.json())
// app.use(express.static(`${__dirname}/../public/frontend`))

app.get('/api/products', products_controller.getAll);
app.get('/api/products/:id', products_controller.getOne);
app.post('/api/products', products_controller.create);
app.put('/api/products/:id', products_controller.update);
app.delete('/api/products/:id', products_controller.delete);

app.listen(SERVER_PORT, () => {console.log(`${SERVER_PORT} running.`)});