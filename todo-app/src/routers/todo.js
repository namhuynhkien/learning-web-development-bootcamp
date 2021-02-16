const express = require('express');
const router = express.Router();
const {
  listTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} = require('../controllers/todo');

function logger(req, res, next) {
  console.log(`Calling to ${req.baseUrl}${req.url} with method ${req.method}`);
  next();
}

router.use(logger);

router
  .get('/', listTodos)
  .post('/', addTodo)
  .delete('/:id', deleteTodo)
  .patch('/:id', updateTodo);

module.exports = router;
