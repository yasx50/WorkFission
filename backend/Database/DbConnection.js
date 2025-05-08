import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Load the environment variables

// Initialize Sequelize with PostgreSQL connection
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST, // from .env file
  username: process.env.DB_USER, // from .env file
  password: process.env.DB_PASSWORD, // from .env file
  database: process.env.DB_NAME, // from .env file
  port: process.env.DB_PORT, // from .env file
  logging: false, 
});

// Function to test DB connection
export const connectDB = async () => {
  try {
    await sequelize.authenticate(); // Test the connection
    console.log('✅ Connected to PostgreSQL using Sequelize');
  } catch (err) {
    console.error('❌ Error connecting to PostgreSQL:', err.message);
    throw err;
  }
};

export default sequelize; // Export sequelize instance for model definition
