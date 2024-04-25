import { Router } from 'express';

const todos = []; 

const router = Router();

router.get('/', (req, res, next) => {
    res.status(200).json( { todos: todos  });
})

export default router; 