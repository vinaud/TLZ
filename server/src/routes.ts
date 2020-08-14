import express from 'express';

const routes = express.Router();

routes.get('/', (request, response) => {
    return response.json({message: "hello world"});
    });

    routes.get('/hello', (request, response) => {
        return response.json({message: "hello world hello"});
        });
export default routes;