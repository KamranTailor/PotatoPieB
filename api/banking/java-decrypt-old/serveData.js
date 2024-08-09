import { encrypt } from './dataUtils.js';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

// Function to set user data in a JSON file
function setUserData(userData, secretKey, filePath) {
    // Encrypt sensitive fields
    const encryptedUserData = {
        user_id: userData.user_id,
        username: userData.username,
        password: encrypt(userData.password, secretKey),
        email: encrypt(userData.email, secretKey),
        phone_number: encrypt(userData.phone_number, secretKey),
        first_name: userData.first_name,
        last_name: userData.last_name,
        date_of_birth: encrypt(userData.date_of_birth, secretKey),
        address: {
            street: encrypt(userData.address.street, secretKey),
            city: encrypt(userData.address.city, secretKey),
            state: encrypt(userData.address.state, secretKey),
            postal_code: encrypt(userData.address.postal_code, secretKey),
            country: encrypt(userData.address.country, secretKey)
        },
        account: {
            account_number: encrypt(userData.account.account_number, secretKey),
            account_type: userData.account.account_type,
            balance: userData.account.balance
        },
        security_question: userData.security_question,
        security_answer: encrypt(userData.security_answer, secretKey),
        created_at: userData.created_at,
        updated_at: userData.updated_at,
        status: userData.status
    };

    // Write encrypted data to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(encryptedUserData, null, 2), 'utf8');
}

export { setUserData };
