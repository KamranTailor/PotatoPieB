import express from 'express';
import fsPromises from '../../utils/fsPromises.js';

const sessionFilePath = '../database/userData/sessions.json';

const router = express.Router();

async function readSessions() {
    try {
        const data = await fsPromises.readFile(sessionFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading sessions:", error);
        return [];
    }
}

async function loadUserData(userID) {
    try {
        const data = await fsPromises.readFile('../database/userData/users.json', 'utf8');
        const users = JSON.parse(data);
        const userData = users.find(user => user.userID === userID);
        return userData;
    } catch (error) {
        console.error("Error loading user data:", error);
        return null;
    }
}

router.post('/loginCheck', async (req, res) => {
    try {
        const { userID } = req.body;
        const userIP = req.ip;
        const sessions = await readSessions();

        const matchingSession = sessions.find(session => session.userID === userID && session.userIP === req.ip);

        if (matchingSession) {
            // Check if the session is expired
            const sessionExpirationTime = 60 * 60 * 1000; // 1 hour in milliseconds
            const sessionTimestamp = new Date(matchingSession.timestamp).getTime();
            const currentTime = new Date().getTime();
            const sessionAge = currentTime - sessionTimestamp;

            if (sessionAge <= sessionExpirationTime) {
                // Load user data excluding sensitive information
                const userData = await loadUserData(userID);
                if (userData) {
                    const { serverID, first_name, second_name, dob, email, phone_number, username, properties, permissions } = userData;
                    return res.json({ message: true, content: { serverID, first_name, second_name, dob, email, phone_number, username, properties, permissions } });
                } else {
                    return res.json({ message: false, content: "User data not found." });
                }
            } else {
                return res.json({ message: false, content: "Session has expired." });
            }
        } else {
            return res.json({ message: false, content: "No valid session found." });
        }
    } catch (error) {
        console.error("Error in loginCheck route:", error);
        res.status(500).json({ message: false });
    }
});

router.delete('/logout', async (req, res) => {
    try {
        const { userID } = req.body;
        const sessions = await readSessions();

        // Filter out the session with the provided userID
        const updatedSessions = sessions.filter(session => session.userID !== userID);

        // Write the updated sessions back to the file
        await fsPromises.writeFile(sessionFilePath, JSON.stringify(updatedSessions, null, 2));

        res.json({ message: true, content: "User session deleted successfully." });
    } catch (error) {
        console.error("Error in logout route:", error);
        res.status(500).json({ message: false, content: "Failed to delete user session." });
    }
});

export default router;
