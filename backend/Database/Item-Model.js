import { DataTypes } from 'sequelize';
import sequelize from './DbConnection.js';  

const Item = sequelize.define('Item', {
  
  
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

Item.sync({ alter: true }).then(() => {
  console.log('Items table has been created (or updated)');
});

export default Item;
