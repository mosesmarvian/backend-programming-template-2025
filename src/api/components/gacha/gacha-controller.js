const gachaService = require('./gacha-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getUser(request, response, next) {
  try {
    const user = await gachaService.getUser(request.params.id);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    return response.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}
async function doGacha(request, response, next) {
  try {
    const user = await gachaService.getUser(request.params.id);

    if (!user) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'User not found');
    }

    const today = new Date();
    const resetTime = new Date(today);
    resetTime.setHours(0, 0, 0, 0);

    const lastGacha = new Date(user.lastGachaDate);
    lastGacha.setHours(0, 0, 0, 0);

    if (lastGacha.getTime() !== resetTime.getTime()) {
      user.gachaAmount = 0;
    }

    if (user.gachaAmount >= 5) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'You have gacha more than 5 times today.'
      );
    }
    const gachaAmount = user.gachaAmount + 1;

    const chance = 0.5;
    const theChance = Math.random();
    let wonItem = null;
    let isWin = false;

    if (theChance < chance) {
      wonItem = await gachaService.pickAndClaimPrize(user.name, today);
      if (wonItem) {
        isWin = true;
      }
    }

    let historyPrize;
    if (isWin) {
      historyPrize = wonItem.name;
    } else if (theChance < chance) {
      historyPrize = 'Out of Stock';
    } else {
      historyPrize = 'Zonk';
    }

    const historyEntry = {
      date: today,
      isWin,
      prize: historyPrize,
    };

    const success = await gachaService.doGacha(
      request.params.id,
      gachaAmount,
      today,
      historyEntry
    );

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update gacha'
      );
    }

    if (isWin) {
      return response.status(200).json({
        message: 'You win!',
        prize: wonItem.name,
      });
    }

    if (theChance < chance && !wonItem) {
      return response.status(200).json({
        message: 'You won, but all items are out of stock.',
      });
    }

    return response.status(200).json({
      message: 'You lose.',
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getUser,
  doGacha,
};
