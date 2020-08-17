import {Request, Response} from 'express';
import db from '../database/connection';

export default class UsersController{

    async get_infected(request: Request, response: Response) {
        
        return response.json({message: "Infectados"});
    };
}