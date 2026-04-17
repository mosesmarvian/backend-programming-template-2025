module.exports = (db) =>
  db.model(
    'Gacha',
    db.Schema({
      userID: {
        type: db.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
      },
      name: {
        type: String,
        ref: 'Users',
      },
      gachaAmount: { type: Number, default: 0 },
      lastGachaDate: { type: Date, default: Date.now },
      history: Array,
    })
  );
