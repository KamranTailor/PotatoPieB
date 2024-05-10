import express from 'express';
import fsPromises from '../../utils/fsPromises.js';
import crypto from 'crypto';

const userDataFilePath = '../database/userData/users.json';
const sessionFilePath = '../database/userData/sessions.json';

const router = express.Router();

async function readUsers() {
    try {
        const data = await fsPromises.readFile(userDataFilePath, 'utf8');
        return JSON.parse(data) || []; // Return an empty array if data is falsy
    } catch (error) {
        console.error(error);
        return []; // Return an empty array if an error occurs
    }
}


async function saveSession(sessionData) {
    try {
        let sessions = await fsPromises.readFile(sessionFilePath, 'utf8');
        sessions = JSON.parse(sessions);

        // Remove any existing session for the user
        sessions = sessions.filter(session => session.userID !== sessionData.userID);

        // Add the new session
        sessions.push(sessionData);

        // Write the updated sessions back to the file
        await fsPromises.writeFile(sessionFilePath, JSON.stringify(sessions, null, 2));
    } catch (error) {
        console.error(error);
    }
}


router.post('/loginWeb', async (req, res) => {
    try {
        const { username, password } = req.body;
        const userIP = req.ip;

        const users = await readUsers();

        for (const user of users) {
            if (user.username.toLowerCase() === username.toLowerCase()) {
                const hashedInputPassword = crypto.pbkdf2Sync(password, user.password.salt, 10000, 64, 'sha512').toString('hex');
                if (hashedInputPassword === user.password.hash) {
                    // Save session data
                    const sessionData = {
                        userID: user.userID,
                        username: user.username,
                        userIP: userIP,
                        timestamp: new Date().toISOString()
                    };
                    await saveSession(sessionData);

                    return res.json({ message: true, serverID: user.serverID, userID: user.userID });
                } else {
                    return res.json({ message: false, content: "Incorrect Password" });
                }
            }
        }

        return res.json({ message: false, content: "Incorrect Username" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: false });
    }
});

export default router;
