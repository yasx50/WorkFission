import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Load the environment variables

// Initialize Sequelize with connection string (Neon)
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Necessary for Neon
    },
  },
  logging: false, // Disable SQL query logging
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

export default sequelize; // Export sequelize instance
