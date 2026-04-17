const express = require('express');

const winnersController = require('./winners-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/winners', route);

  // Get list of winners
  route.get('/', winnersController.getWinners);
};
