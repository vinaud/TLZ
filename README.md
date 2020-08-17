# TLZ

# Server

## Instructions
### Instalation

- Install dependencies:
```bash

$ yarn install
```
- Execute migrations :
```bash

$ yarn knex:migrate
```

### Execution

```bash

$ yarn start
```

## Endpoints

### Survival Registration

POST http://localhost:3333/users

Body: 
{
 "name": "Ray",
 "age": 21,
 "gender": "Male",
 "latitude": "12121212",
 "longitude": "23232323",
  "water": 200,
  "weapon": 100,
  "medicine": 300,
  "food": 600
}

Response:
Status 201 if all correctly
{
  "user": "Ray 444",
  "id": 9
}


### Update Location

PUT http://localhost:3333/users
Body:
{
	"user_id": 5,
	"new_longitude": 4,
	"new_latitude": 4
}

Response: 
201
{
  "message": "Location updated"
}

### Flag user as infected

PUT http://localhost:3333/users/flag

Body:
{
	"user_id": 2
}

Response:
{
  "message": "User flagged",
  "status": "user confirmed as infected"
}

### Trade items

PUT http://localhost:3333/users/trade

Body:
{
	"offer_user_id": 7,
	"requested_user_id": 8,
	"ou_water": 5,
   "ou_food": 0,
   "ou_weapons": 0,
   "ou_medicines" :5,
   "ru_water" :0,
   "ru_food" :6,
   "ru_weapons" :6,
   "ru_medicines" :0
	
}

Responses:
200 OK if trade success
{
  "message": "Successfull Trade",
  "offer_user_inventory": {
    "water": 170,
    "food": 636,
    "weapons": 136,
    "medicines": 270
  },
  "requested_user_inventory": {
    "water": 230,
    "food": 564,
    "weapons": 64,
    "medicines": 330
  }
}

If any selected survivals are infected the trade won't happen and a 400 status wil be returned
If the required amount for some item to be traded is higher than available a 400 status will be returned
If both users items point for trade don't match, the trade won't happen and a 400 status will be returned

### Infected Report 

GET http://localhost:3333/reports/infected

Response:
{
  "Survivors": 9,
  "Infected": 4,
  "Infected_percentage": 44.44444444444444
}

### Non-infected Report

GET http://localhost:3333/reports/not-infected

Response: 
{
  "Survivors": 9,
  "Not_Infected": 5,
  "Not_infected_percentage": 55.55555555555556
}

### Average Items per Survivor

GET http://localhost:3333/reports/avg-items

Response:
{
  "Survivors": 5,
  "AVG_water": 121.6,
  "AVG_food": 364.8,
  "AVG_weapon": 60.8,
  "AVG_medicine": 182.4
}

### Total lost points by a infected survivor

GET http://localhost:3333/reports/lost-points

Body:

{
	"user_id": 8
}

Response:

{
  "Survivor_id": 8,
  "Lost_points": 13800
}

