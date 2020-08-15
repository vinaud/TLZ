import {Request, Response} from 'express';
import db from '../database/connection';


interface ScheduleItem{
    week_day: number;
    from: string;
    to: string;
}

export default class UsersController{
    async index(request: Request, response: Response) {
        
        return response.json({message: "hello world"});
    };

    async create(request: Request, response: Response) {
        
        return response.json({message: "hello new user"});
    };
}