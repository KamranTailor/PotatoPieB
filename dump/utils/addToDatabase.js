import fsPromises from '../../utils/fsPromises.js'; // Import fsPromises from the CommonJS module


// Define the path to your JSON file
const filePath = '../database/flight/hourFlights.json';

// Function to add items to the database
async function addItemToDatabase(items) {
  try {
    // Load existing data or initialize an empty array if the file doesn't exist
    let database = [];
    try {
      const data = await fsPromises.readFile(filePath, 'utf-8');
      database = JSON.parse(data);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
    
    // Merge new items into the existing database array
    database.push(...items);

    // Save updated database to the file
    await fsPromises.writeFile(filePath, JSON.stringify(database, null, 2));

    console.log('Items added to database and file updated successfully.');
  } catch (error) {
    throw error;
  }
}

export { addItemToDatabase };