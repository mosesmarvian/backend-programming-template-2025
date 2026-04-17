const { Gacha, Prizes } = require('../../../models');

async function getUser(id) {
  return Gacha.findOne({ userID: id });
}

async function createUserGacha(id, username) {
  return Gacha.create({
    userID: id,
    name: username,
    gachaAmount: 0,
    lastGachaDate: new Date(),
    history: [],
  });
}

async function doGacha(id, gachaAmount, lastGachaDate, historyEntry) {
  return Gacha.updateOne(
    { userID: id },
    { $set: { gachaAmount, lastGachaDate }, $push: { history: historyEntry } }
  );
}

async function getRandomAvailablePrize() {
  return Prizes.find({ available: { $gt: 0 } });
}

async function claimPrize(prizeId) {
  return Prizes.findByIdAndUpdate(
    prizeId,
    { $inc: { available: -1 } },
    { new: true }
  );
}

module.exports = {
  createUserGacha,
  getUser,
  doGacha,
  getRandomAvailablePrize,
  claimPrize,
};
