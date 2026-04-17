const winnersRepository = require('./winners-repository');

function maskName(name) {
  return name
    .split('')
    .map((char) => {
      if (char === ' ') return ' ';
      return Math.random() > 0.5 ? '*' : char;
    })
    .join('');
}

async function getWinnersList() {
  return winnersRepository.getWinners();
}

module.exports = {
  getWinnersList,
  maskName,
};
