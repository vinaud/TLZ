import {Request, Response} from 'express';
import db from '../database/connection';



export default class UsersController{
    async index(request: Request, response: Response) {
        
        return response.json({message: "hello world"});
    };

    async create(request: Request, response: Response) {
        
        const {
            name, 
            age,
            gender,
            latitude,
            longitude,
            water,
            weapon,
            medicine,
            food
           
        } = request.body;

        const infected = false;
        const reports = 0;
    
        const transaction = await db.transaction();
    
        try {
            const insertedUsersIds = await transaction('users').insert({
                name,
                age,
                gender,
                latitude,
                longitude,
                infected,
                reports
            });
        
            const user_id = insertedUsersIds[0];
            
            const insertedInventoryIds = await transaction('inventory').insert({
                water,
                weapon,
                medicine,
                food,
                user_id
            });

            await transaction.commit();
        
            return response.status(201).send();
        } catch (err) {
            await transaction.rollback();
            return response.status(400).json({
                error: 'Erro ao cadastrar o usuário no sistema'
            })
        }
    
    }
}