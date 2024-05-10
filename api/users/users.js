// api/admin/users/users.js

import express from 'express';
import fsPromises from '../../utils/fsPromises.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.get('/', async (request, response) => {
        try {
            // Read the JSON file asynchronously
            const jsonData = await fsPromises.readFile('../database/userData/users.json', 'utf8');
            
            // Parse the JSON data into a JavaScript object
            const data = JSON.parse(jsonData);
            
            let f = 0;
            for (let i in data) {
                delete data[f].password
                delete data[f].serverID
                f++
            }

            // Respond with the JSON data
            response.json({status: true, data: data});
        } catch (error) {
            console.error('Error reading JSON file:', error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
});

router.post('/user', async (request, response) => {
    try {
        // Read the JSON file asynchronously
        const jsonData = await fsPromises.readFile('../database/userData/users.json', 'utf8');
        
        // Parse the JSON data into a JavaScript object
        const data = JSON.parse(jsonData);
        
        let f = 0;
        for (let i in data) {
            if (data[i].userID === request.body.userID) {
                response.json({userData: data[i]});
            }
        }        
    } catch (error) {
        console.error('Error reading JSON file:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/update', async (request, response) => {
    try {
        // Read the JSON file asynchronously
        const jsonData = await fsPromises.readFile('../database/userData/users.json', 'utf8');
        
        // Parse the JSON data into a JavaScript object
        let data = JSON.parse(jsonData);
        
        let updated = false;
        for (let i in data) {
            if (data[i].userID === request.body.userID) {
                // Update the user data
                data[i].first_name = request.body.first_name;
                data[i].second_name = request.body.second_name;
                data[i].dob = request.body.dob;
                data[i].email = request.body.email;
                data[i].permissions = request.body.permissions;
                data[i].phone_number = request.body.phone_number;
                data[i].username = request.body.username;
                
                updated = true;
                break; // Assuming there's only one user with a specific userID, so no need to continue looping
            }
        }

        if (updated) {
            // Write the updated data back to the JSON file
            await fsPromises.writeFile('../database/userData/users.json', JSON.stringify(data, null, 2), 'utf8');
            response.status(200).json({ message: 'User data updated successfully' });
        } else {
            response.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error reading/writing JSON file:', error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;

