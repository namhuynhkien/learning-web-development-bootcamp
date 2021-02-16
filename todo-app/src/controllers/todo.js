const TODOS = require('../models/todo');

function listTodos(req, res) {
  res.status(200).json({ todos: TODOS });
}

function addTodo(req, res) {
  const id = Math.floor(Math.random() * 100);
  const title = req.body.title;
  TODOS.push({ id: id, title: title });
  res.status(200).send('Added todo.');
}

function deleteTodo(req, res) {
  const id = Number(req.params.id);

  const todoIndex = TODOS.findIndex(todo => todo.id === id);

  if (todoIndex < 0) {
    throw new Error('Could not find todo.');
  }

  TODOS.splice(todoIndex, 1);

  res.json('Todo deleted.');
}

function updateTodo(req, res) {
  const id = Number(req.params.id);
  const updatedTitle = req.body.title;
  const todoIndex = TODOS.findIndex(todo => todo.id === id);

  if (todoIndex < 0) {
    throw new Error('Could not find todo.');
  }

  TODOS[todoIndex].title = updatedTitle;
  res.json('Todo updated.');
}

module.exports = { listTodos, addTodo, deleteTodo, updateTodo };
