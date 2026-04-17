const express = require('express');

const gachaController = require('./gacha-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/gacha', route);

  route.get('/:id', gachaController.getUser);

  route.put('/:id', gachaController.doGacha);
};
