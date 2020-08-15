import {Request, Response} from 'express';
import db from '../database/connection';



export default class UsersController{
    async index(request: Request, response: Response) {
        
        return response.json({message: "hello world"});
    };

    async update_location(request: Request, response: Response) {
        
        const {
            user_id, 
            new_latitude,
            new_longitude,
           
        } = request.body;

        const transaction = await db.transaction();

        try {
            const updatedUsersIds = await transaction('users')
            .where({ id: user_id })
            .update({ latitude: new_latitude, longitude: new_longitude })
    
            await transaction.commit();
        
            return response.status(201).json({
               message: 'Location updated',
                
            })
        } catch (err) {
            await transaction.rollback();
            return response.status(400).json({
                error: 'Error at updating user location'
            })
        }

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
            const accessible = true;
            
            
            const insertedInventoryIds = await transaction('inventory').insert({
                water,
                weapon,
                medicine,
                food,
                accessible,
                user_id
            });

            await transaction.commit();
        
            return response.status(201).json({
                user: name,
                id: user_id
            })
        } catch (err) {
            await transaction.rollback();
            return response.status(400).json({
                error: 'Error at creating new user'
            })
        }
    
    }
}