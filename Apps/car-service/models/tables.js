class Tables {
  constructor(dao) {
    this.dao = dao
  }

  createCars() {
    const sql = `
    CREATE TABLE IF NOT EXISTS Cars (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        latitude REAL,
        longitude REAL,
        matricula TEXT
        )`
    return this.dao.run(sql)
  }
}

module.exports = Tables;
