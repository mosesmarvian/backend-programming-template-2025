const { Prizes } = require('../../../models');

async function getPrizes() {
  return Prizes.find({});
}

module.exports = {
  getPrizes,
};
