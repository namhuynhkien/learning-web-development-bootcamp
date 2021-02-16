const express = require('express');
const bodyParser = require('body-parser');
const todoRouter = require('./src/routers/todo');

const app = express();
app.use(bodyParser.json());
app.use('/todos', todoRouter);

app.listen(3000, () => console.log('Listen to port 3000.'));
