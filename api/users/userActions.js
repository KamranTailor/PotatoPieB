// api/admin/users/users.js

import express from 'express';
import fsPromises from '../../utils/fsPromises.js';
import * as crypto from 'crypto';

const router = express.Router();
const file = "../database/userData/users.json";

router.post('/delete', async (request, response) => {
    try {
        const userID = request.body.userID;
        const users = JSON.parse(await fsPromises.readFile(file, 'utf-8'));

        const user = users.find(u => u.userID === userID);

        if (user) {
            if (user.permissions === "Alpha") {
                const userToDelete = request.body.usernameDel;
                const userIndex = users.findIndex(u => u.username === userToDelete);

                if (userIndex !== -1) {
                    users.splice(userIndex, 1);
                    await fsPromises.writeFile(file, JSON.stringify(users, null, 2), 'utf-8');

                    response.json({ success: true, message: 'User deleted successfully' });
                } else {
                    response.json({ success: false, message: 'User to delete not found' });
                }
            } else {
                response.json({ success: false, message: 'Auth error' });
            }
        } else {
            response.json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).json({ success: false, message: 'An error occurred while deleting a user' });
    }
});

router.post('/resetAdm', async (request, response) => {
    try {
        const userID = request.body.userID;
        const users = JSON.parse(await fsPromises.readFile(file, 'utf-8'));

        const user = users.find(u => u.userID === userID);

        if (user) {
            if (user.permissions === "Alpha") {
                const userToResetUsername = request.body.usernameDel;
                const userToReset = users.find(u => u.username === userToResetUsername);

                if (userToReset) {
                    const newPassword = "password123";
                    const newSalt = crypto.randomBytes(16).toString('hex');
                    const hashedNewPassword = crypto.pbkdf2Sync(newPassword, newSalt, 10000, 64, 'sha512').toString('hex');

                    userToReset.password.hash = hashedNewPassword;
                    userToReset.password.salt = newSalt;

                    await fsPromises.writeFile(file, JSON.stringify(users, null, 2));

                    response.json({ success: true, message: 'Password reset successfully', newPassword });
                } else {
                    response.json({ success: false, message: 'User to reset not found' });
                }
            } else {
                response.json({ success: false, message: 'Auth error' });
            }
        } else {
            response.json({ success: false, message: 'Admin not found' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).json({ success: false, message: 'An error occurred while resetting admin password' });
    }
});

export default router;
