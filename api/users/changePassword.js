// api/admin/users/users.js

import express from 'express';
import fsPromises from '../../utils/fsPromises.js';
import * as crypto from 'crypto';

const router = express.Router();
const file = "../database/userData/users.json";

router.post('/', async (request, response) => {
    try {
        const userID = request.body.userID;
        const oldPassword = request.body.oldPassword;
        const newPassword = request.body.newPassword;
        const confirmNewPassword = request.body.confirmNewPassword;

        // Check if the new password meets the criteria
        if (!isValidPassword(newPassword)) {
            return response.json({ success: false, message: 'New password does not meet the criteria' });
        }

        // Check if the new password and confirm new password match
        if (newPassword !== confirmNewPassword) {
            return response.json({ success: false, message: 'New password and confirm new password do not match' });
        }

        const users = JSON.parse(await fsPromises.readFile(file, 'utf-8'));

        const userIndex = users.findIndex(u => u.userID === userID);

        if (userIndex !== -1) {
            const user = users[userIndex];

            // Verify old password
            const hashedOldPassword = crypto.pbkdf2Sync(oldPassword, user.password.salt, 10000, 64, 'sha512').toString('hex');
            if (hashedOldPassword !== user.password.hash) {
                return response.json({ success: false, message: 'Old password is incorrect' });
            }

            // Generate new salt and hash for the new password
            const newSalt = crypto.randomBytes(16).toString('hex');
            const hashedNewPassword = crypto.pbkdf2Sync(newPassword, newSalt, 10000, 64, 'sha512').toString('hex');

            // Update user's password
            user.password.hash = hashedNewPassword;
            user.password.salt = newSalt;

            await fsPromises.writeFile(file, JSON.stringify(users, null, 2));

            response.json({ success: true, message: 'Password changed successfully' });
        } else {
            response.json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).json({ success: false, message: 'An error occurred while changing password' });
    }
});

// Function to validate password
function isValidPassword(password) {
    // Regex to check if password contains at least 1 capital letter and at least 1 number and is at least 8 characters long
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}

export default router;