import {Request, Response} from 'express';
import db from '../database/connection';

const WATER_POINTS = 14;
const MEDICINE_POINTS = 10;
const WEAPON_POINTS = 8;
const FOOD_POINTS = 12;


export default class UsersController{
    //TODO
    async index(request: Request, response: Response) {
        
        return response.json({message: "hello world"});
    };

    async trade(request: Request, response: Response) {
        const {
            offer_user_id, 
            requested_user_id,
            ou_water,
            ou_food,
            ou_weapons,
            ou_medicines,
            ru_water,
            ru_food,
            ru_weapons,
            ru_medicines,
           
        } = request.body;

        
        const offer_user_inventory = await db.from("inventory")
        .select("*")
        .where("user_id", offer_user_id)
        .first();

        const requested_user_inventory = await db.from("inventory")
        .select("*")
        .where("user_id", requested_user_id)
        .first();
        
       
        
        console.log("Offer User Inventory:",offer_user_inventory, "Requested User inventory",requested_user_inventory);

        if(!offer_user_inventory.accessible || !requested_user_inventory){
            return response.status(400).json({
                error: "Infected user can't trade items"
            })
        }

        if(ou_water > offer_user_inventory.water || ru_water > requested_user_inventory.water ||
            ou_food > offer_user_inventory.food|| ru_food > requested_user_inventory.food ||
            ou_weapons > offer_user_inventory.weapon || ru_weapons > requested_user_inventory.weapon ||
            ou_medicines > offer_user_inventory.medicine || ru_medicines > requested_user_inventory.medicine){
            return response.status(400).json({
                error: "Requested amount  higher than available items"
            })
        }

        const offer_user_points = (
            ou_water * WATER_POINTS +
            ou_weapons * WEAPON_POINTS +
            ou_food * FOOD_POINTS +
            ou_medicines * MEDICINE_POINTS
            );
        
        console.log ('Offer user points: ', offer_user_points);

        const requested_user_points = (
            ru_water * WATER_POINTS +
            ru_weapons * WEAPON_POINTS +
            ru_food * FOOD_POINTS +
            ru_medicines * MEDICINE_POINTS
            );
        
        console.log ('Requested user points: ', requested_user_points);

        if( requested_user_points != offer_user_points){
            return response.status(400).json({
                error: "Requested trade doesn't match required points "
            })
        }

        else{ // with all condition matching, the trade is done 
            const transaction = await db.transaction();
            const new_ru_water = requested_user_inventory.water - ru_water + ou_water;
            const new_ru_food = requested_user_inventory.food - ru_food + ou_food;
            const new_ru_weapon = requested_user_inventory.weapon - ru_weapons + ou_weapons;
            const new_ru_medicine = requested_user_inventory.medicine - ru_medicines+ ou_medicines;

            const new_ou_water = offer_user_inventory.water - ou_water + ru_water;
            const new_ou_food = offer_user_inventory.food - ou_food + ru_food;
            const new_ou_weapon = offer_user_inventory.weapon - ou_weapons + ru_weapons;
            const new_ou_medicine = offer_user_inventory.medicine - ou_medicines + ru_medicines;

            try {
                await transaction('inventory')
                .where({ user_id: offer_user_id })
                .update({ water: new_ou_water, food: new_ou_food, weapon: new_ou_weapon, medicine: new_ou_medicine});

                await transaction('inventory')
                .where({ user_id: requested_user_id })
                .update({ water: new_ru_water, food: new_ru_food, weapon: new_ru_weapon, medicine: new_ru_medicine});
        
                await transaction.commit();
            
                return response.status(200).json({
                   message: 'Successfull Trade',
                   offer_user_inventory:{
                       water: new_ou_water,
                       food: new_ou_food,
                       weapons: new_ou_weapon,
                       medicines: new_ou_medicine
                   },

                   requested_user_inventory:{
                    water: new_ru_water,
                    food: new_ru_food,
                    weapons: new_ru_weapon,
                    medicines: new_ru_medicine
                },

                })
            } catch (err) {
                await transaction.rollback();
                return response.status(400).json({
                    error: 'Error at database access'
                })
        }
        }

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