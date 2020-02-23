const Sequelize = require('sequelize');
const signale = require('signale');
// const { Op } = Sequelize;
// const operatorsAliases = {
//    $gt: Op.gt,
// };

const sequelize = new Sequelize(
   process.env.DATABASE_NAME,
   process.env.DATABASE_USERNAME,
   process.env.DATABASE_PASSWORD,
   {
      host: process.env.DATABASE_HOST,
      dialect: 'mysql',
      // operatorsAliases,
      dialectOptions: {
         decimalNumbers: true,
      },
      maxConcurrentQueries: 100,
      logging: false,
      pool: {
         max: 100,
         min: 0,
         acquire: 30000,
         idle: 10000,
      },
      timezone: '+05:30',
   }
);

sequelize
   .authenticate()
   .then(() => signale.success(`Database - ${process.env.DATABASE_NAME} CONNECTED`))
   .catch(() => signale.fatal(`Database - ${process.env.DATABASE_NAME} connection FAILED`));

module.exports = sequelize;
