const { Winners } = require('../../../models');

async function addWinnerToPrize(prizeId, prizeName, userName, takenDate) {
  return Winners.updateOne(
    { prizeID: prizeId },
    {
      $set: { prizeName },
      $push: { prizeWinners: userName, takenDate },
    },
    { upsert: true }
  );
}

async function getWinners() {
  return Winners.find({});
}

module.exports = {
  getWinners,
  addWinnerToPrize,
};
