import { Sequelize } from 'sequelize-typescript';
import config from '../config/config';

const connectWithRetry = async () => {
  const sequelize = new Sequelize({
    dialect: 'postgres',
    host: config.dbHost,
    username: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    logging: false,
    models: [__dirname + '/../models'],
  });

  const retryOptions = {
    retries: 5,
    factor: 2,
    minTimeout: 1000,
    maxTimeout: 5000,
  };

  for (let i = 0; i < retryOptions.retries; i++) {
    try {
      await sequelize.authenticate();
      await sequelize.sync();
      console.log('Database connection established successfully.');
      return sequelize;
    } catch (err) {
      console.error(
        `Database connection failed. Retrying in ${retryOptions.minTimeout}ms...`
      );
      await new Promise((res) => setTimeout(res, retryOptions.minTimeout));
    }
  }

  throw new Error('Unable to connect to the database after multiple attempts.');
};

let connection: Sequelize;

const initializeConnection = async () => {
  connection = await connectWithRetry();
};

initializeConnection();

export default initializeConnection;
