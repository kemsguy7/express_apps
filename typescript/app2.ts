import express from 'express';

import todosRoutes from './routers/todos'

const app = express();

app.use(todosRoutes);   //using todos route as middleware with the use method 

app.listen(3000); 


