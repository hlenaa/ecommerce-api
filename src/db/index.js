import {Sequelize} from 'sequelize';

const sequalize = new Sequelize(process.env.PG_URI);

export default sequalize;