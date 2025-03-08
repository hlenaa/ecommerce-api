import { DataTypes } from 'sequelize';
import User from './User.js';
import sequelize from '../db/index.js';

const Order = sequelize.define('Order', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

export default Order;