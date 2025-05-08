import { DataTypes } from 'sequelize';
import sequelize from './DbConnection.js';  // Import the sequelize connection

const Item = sequelize.define('Item', {
  // Defining columns and their data types
  
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Synchronize the model with the database (creates the table if it doesn't exist)
Item.sync({ alter: true }).then(() => {
  console.log('Items table has been created (or updated)');
});

export default Item;
