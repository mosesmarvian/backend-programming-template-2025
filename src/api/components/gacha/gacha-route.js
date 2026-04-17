const express = require('express');

const gachaController = require('./gacha-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/gacha', route);

  // Get user detail
  route.get('/:id', gachaController.getUser);

  // Do gacha on user
  route.put('/:id', gachaController.doGacha);
};
