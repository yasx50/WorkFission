import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); 


const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, 
    },
  },
  logging: false, 
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate(); 
    console.log('✅ Connected to PostgreSQL using Sequelize');
  } catch (err) {
    console.error('❌ Error connecting to PostgreSQL:', err.message);
    throw err;
  }
};

export default sequelize; 
