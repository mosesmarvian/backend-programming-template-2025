const express = require('express');

const prizesController = require('./prizes-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/prizes', route);

  // Get list of prizes
  route.get('/', prizesController.getPrizes);
};
