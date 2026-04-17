const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const config = require('../core/config');
const logger = require('../core/logger')('app');

// Join the database connection string
const connectionString = new URL(config.database.connection);
connectionString.pathname += config.database.name;

mongoose.connect(`${connectionString.toString()}`);

const db = mongoose.connection;
db.once('open', () => {
  logger.info('Successfully connected to MongoDB');
});

const dbExports = {};
dbExports.db = db;

db.once('open', async () => {
  try {
    const PrizeModel = dbExports.Prizes;

    const count = await PrizeModel.countDocuments();

    if (count === 0) {
      const defaultPrizes = [
        { name: 'Emas 10 gram', quota: 1, available: 1 },
        { name: 'Smartphone X', quota: 5, available: 5 },
        { name: 'Smartwatch Y', quota: 10, available: 10 },
        { name: 'Voucher Rp100.000', quota: 100, available: 100 },
        { name: 'Pulsa Rp50.000', quota: 500, available: 500 },
      ];
      await PrizeModel.insertMany(defaultPrizes);
    }
  } catch (error) {
    logger.error('Error initializing prizes:', error);
  }
});

const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const model = require(path.join(__dirname, file))(mongoose);
    dbExports[model.modelName] = model;
  });

module.exports = dbExports;
