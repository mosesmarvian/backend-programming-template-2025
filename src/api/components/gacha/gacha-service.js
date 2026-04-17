const gachaRepository = require('./gacha-repository');
const winnersRepository = require('../winners/winners-repository');
const { maskName } = require('../winners/winners-service');

async function getUser(id) {
  return gachaRepository.getUser(id);
}

async function doGacha(id, gachaAmount, lastGachaDate, historyEntry) {
  return gachaRepository.doGacha(id, gachaAmount, lastGachaDate, historyEntry);
}

async function pickAndClaimPrize(userName, takenDate) {
  const availablePrizes = await gachaRepository.getRandomAvailablePrize();

  if (availablePrizes.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * availablePrizes.length);
  const selectedPrize = availablePrizes[randomIndex];

  const maskedUserName = maskName(userName);
  await gachaRepository.claimPrize(selectedPrize.id);
  await winnersRepository.addWinnerToPrize(
    selectedPrize.id,
    selectedPrize.name,
    maskedUserName,
    takenDate
  );

  return selectedPrize;
}

module.exports = {
  getUser,
  doGacha,
  pickAndClaimPrize,
};
