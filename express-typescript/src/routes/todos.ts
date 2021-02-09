import { Router } from 'express';

import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from '../controllers/todos';

const route = Router();

route.post('/', createTodo);

route.get('/', getTodos);

route.patch('/:id', updateTodo);

route.delete('/:id', deleteTodo);

export default route;
