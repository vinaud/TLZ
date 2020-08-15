import {Request, Response} from 'express';
import db from '../database/connection';



export default class UsersController{
    //TODO
    async index(request: Request, response: Response) {
        
        return response.json({message: "hello world"});
    };


    async flag(request: Request, response: Response) {
        
        const {
            user_id, 
        } = request.body;
        console.log('id:',user_id)

        let user_flags = await db.from("users")
        .select("*")
        .where("id", user_id)
        .first();

        console.log(user_flags)
        let count = user_flags.reports
        console.log(count,',')
        count = count + 1

        console.log(count)

        if(count<5){
            const transaction = await db.transaction();

            try {
                await transaction('users')
                .where({ id: user_id })
                .update({ reports: count})
        
                await transaction.commit();
            
                return response.status(201).json({
                   message: 'User flagged',
                   
                    
                })
            } catch (err) {
                await transaction.rollback();
                return response.status(400).json({
                    error: 'Error at flagging user'
                })
        }

    }

        else{
            const transaction = await db.transaction();

            try {
                await transaction('users')
                .where({ id: user_id })
                .update({ reports: count, infected: true  });

                await transaction('inventory')
                .where({ User_id: user_id })
                .update({ accessible: false })
        
                await transaction.commit();
            
                return response.status(201).json({
                   message: 'User flagged',
                   status: 'user confirmed as infected'
                    
                })
            } catch (err) {
                await transaction.rollback();
                return response.status(400).json({
                    error: 'Error at flagging user'
                })
        }

    
        };
        }
    
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