const express = require('express');

const winnersController = require('./winners-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/winners', route);

  route.get('/', winnersController.getWinners);
};
