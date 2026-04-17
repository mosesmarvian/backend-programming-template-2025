const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const gacha = require('./components/gacha/gacha-route');
const prizes = require('./components/prizes/prizes-route');
const winners = require('./components/winners/winners-route');

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);
  gacha(app);
  prizes(app);
  winners(app);

  return app;
};
