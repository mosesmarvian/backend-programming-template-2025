module.exports = (db) =>
  db.model(
    'Prizes',
    db.Schema({
      name: String,
      quota: Number,
      available: Number,
    })
  );
