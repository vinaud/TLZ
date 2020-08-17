import express from 'express';

import UsersController from './controllers/UsersController';

const routes = express.Router();
const usersController = new UsersController();

routes.get('/users', usersController.index);

routes.post('/users', usersController.create)

routes.put('/users', usersController.update_location)

routes.put('/users/flag', usersController.flag)

routes.put('/users/trade', usersController.trade)


    
export default routes;