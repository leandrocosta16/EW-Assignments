class Tables {
  constructor(dao) {
    this.dao = dao
  }

  createPassadeiras() {
    const sql = `
    CREATE TABLE IF NOT EXISTS Passadeiras (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        latitude REAL,
        longitude REAL,
        nPedestrians INTEGER DEFAULT 0,
        nCars INTEGER DEFAULT 0,
        totalPedestrians INTEGER DEFAULT 0,
        totalCars INTEGER DEFAULT 0
        )`
    return this.dao.run(sql)
  }
}

module.exports = Tables;
