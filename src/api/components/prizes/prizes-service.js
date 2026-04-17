const prizesRepository = require('./prizes-repository');

async function getPrizes() {
  return prizesRepository.getPrizes();
}

module.exports = {
  getPrizes,
};
