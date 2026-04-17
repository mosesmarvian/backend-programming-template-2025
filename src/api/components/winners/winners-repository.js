const { Winners } = require('../../../models');

async function addWinnerToPrize(prizeId, prizeName, userName) {
  return Winners.updateOne(
    { prizeID: prizeId },
    {
      $set: { prizeName },
      $push: { prizeWinners: userName },
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
