import {Request, Response} from 'express';
import db from '../database/connection';

const WATER_POINTS = 14;
const MEDICINE_POINTS = 10;
const WEAPON_POINTS = 8;
const FOOD_POINTS = 12;

export default class UsersController{

    async get_infected(request: Request, response: Response) {
        
        const totalSurvivors = await db('users').count('* as total');
        const total: number = totalSurvivors[0].total;

        const infectedSurvivors = await db('users').count('* as infected').where("infected",true);
        const  infected : number = infectedSurvivors[0].infected;

        const infectedPercentage: number = infected / total* 100 

        return response.json({Survivors: total, Infected: infected, Infected_percentage: infectedPercentage });
    };

    async get_not_infected(request: Request, response: Response) {
        
        const totalSurvivors = await db('users').count('* as total');
        const total: number = totalSurvivors[0].total;

        const infectedSurvivors = await db('users').count('* as infected').where("infected",false);
        const  nonInfected : number = infectedSurvivors[0].infected;

        const infectedPercentage: number = nonInfected / total* 100 

        return response.json({Survivors: total, Not_Infected: nonInfected, Not_infected_percentage: infectedPercentage });
    };

    async avgItems(request: Request, response: Response) {
        
        const totalSurvivorsList = await db('users').count('* as total').where("infected",false);
        const totalSurvivors: number = totalSurvivorsList[0].total;

        const items = await db('inventory').select('*');

        var totalWater = items.reduce(function (accumulator, item) {
            return accumulator + item.water;
          }, 0);

        const avgWater = totalWater / totalSurvivors;
        console.log("Total water: ", totalWater, "AVG Water: ", avgWater)

        
        var totalFood = items.reduce(function (accumulator, item) {
            return accumulator + item.food;
          }, 0);

        const avgFood = totalFood / totalSurvivors;
        console.log("Total food: ", totalFood, "AVG Food: ", avgFood)

        var totalWeapon = items.reduce(function (accumulator, item) {
            return accumulator + item.weapon;
          }, 0);

        const avgWeapon = totalWeapon/ totalSurvivors;
        console.log("Total weapons: ", totalWeapon, "AVG weapons: ", avgWeapon)

        var totalMedicine = items.reduce(function (accumulator, item) {
            return accumulator + item.medicine;
          }, 0);

        const avgMedicine = totalMedicine/ totalSurvivors;
        console.log("Total medicines: ", totalMedicine, "AVG medicines: ", avgMedicine)

        return response.json(
            {Survivors: totalSurvivors,
             AVG_water: avgWater,
             AVG_food: avgFood,
             AVG_weapon: avgWeapon,
             AVG_medicine: avgMedicine });
    };

    async lostItems(request: Request, response: Response) {

        const {
            user_id, 
        } = request.body;

        const user_inventory = await db.from("inventory")
        .select("*")
        .where("user_id", user_id)
        .first();

        const lostPoints = 
        user_inventory.water * WATER_POINTS 
        + user_inventory.weapon * WEAPON_POINTS
        + user_inventory.food * FOOD_POINTS
        + user_inventory.medicine * MEDICINE_POINTS ;
        
        return response.json({Survivor_id: user_id, Lost_points: lostPoints });
    };

}