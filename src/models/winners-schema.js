module.exports = (db) =>
  db.model(
    'Winners',
    db.Schema({
      prizeID: {
        type: db.Schema.Types.ObjectId,
        ref: 'Prizes',
        required: true,
      },
      prizeName: String,
      prizeWinners: Array,
    })
  );
