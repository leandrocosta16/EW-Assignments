class Tables {
  constructor(dao) {
    this.dao = dao
  }

  createPedestres() {
    const sql = `
    CREATE TABLE IF NOT EXISTS Pedestres (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        latitude REAL,
        longitude REAL,
        email TEXT,
        passadeira_id INTEGER
        )`
    return this.dao.run(sql)
  }
}

module.exports = Tables;
