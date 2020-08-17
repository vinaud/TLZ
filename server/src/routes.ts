import express from 'express';

import UsersController from './controllers/UsersController';
import ReportsController from './controllers/ReportsController'

const routes = express.Router();
const usersController = new UsersController();
const reportsController = new ReportsController();

routes.get('/users', usersController.index);

routes.post('/users', usersController.create)

routes.put('/users', usersController.update_location)

routes.put('/users/flag', usersController.flag)

routes.put('/users/trade', usersController.trade)

routes.get('/repots/infected', reportsController.get_infected)


    
export default routes;