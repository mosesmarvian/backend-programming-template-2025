const winnersService = require('./winners-service');

async function getWinners(request, response, next) {
  try {
    const winners = await winnersService.getWinnersList();
    return response.status(200).json(winners);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getWinners,
};
