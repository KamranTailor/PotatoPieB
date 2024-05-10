// api/admin/users/users.js

import express from 'express';
import fsPromises from '../../utils/fsPromises.js';
import * as crypto from 'crypto';



const router = express.Router();
const file = "../database/userData/users.json";

const uid = function() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

router.post('/addUser', async (request, response) => {
    try {
        // Main Items
        
        const first_name = request.body.first_name;
        const second_name = request.body.second_name;
        const dob = request.body.dob;
        const permissions = request.body.permissions;
        const email = request.body.email;
        const phone_number = request.body.dob;
        const propertys = {};


        let username = `${first_name.toLowerCase()}`;
        const userData = JSON.parse(await fsPromises.readFile(file, "utf8"));

        let isUsernameTaken = userData.some(user => user.username === username);
        let suffix = "a";
        while (isUsernameTaken) {
            username = `${first_name.toLowerCase()}-${suffix}`;
            isUsernameTaken = userData.some(user => user.username === username);
            suffix = String.fromCharCode(suffix.charCodeAt(0) + 1);
        }

        let maxUserId = 0;
        for (let i = 0; i < userData.length; i++) {
            if (Number(userData[i].userID) > maxUserId) {
                maxUserId = Number(userData[i].userID);
            }
        }
        let userID = (maxUserId + 1).toString();

        const serverID = uid();
       
        const passwordToHash = "password123";
        const salt = crypto.randomBytes(16).toString('hex');

        crypto.pbkdf2(passwordToHash, salt, 10000, 64, 'sha512', async (err, derivedKey) => {
            if (err) {
                console.error(err);
                return response.status(500).json({ message: false, content: 'An error occurred while adding a user' });
            }
            const hashedPassword = derivedKey.toString('hex');
            const newUser = {
                userID,
                serverID,
                first_name,
                second_name,
                dob,
                email,
                phone_number,
                username,
                password: {
                    hash: hashedPassword,
                    salt: salt
                },
                propertys,
                permissions,
            };
    
            userData.push(newUser);
            await fsPromises.writeFile(file, JSON.stringify(userData, null, 2));
    
            // Remove the plain password and salt from the response
            delete newUser.password;
    
            //emailUSR(1, newUser);
            //modlog(newUser.username, "User Added by an Admin")
            return response.json({ message: true, content: newUser });
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: false, content: 'An error occurred while adding a user' });
    }
});

export default router;