class Queries {
  constructor(dao) {
    this.dao = dao
  }

  //READ DATA
  getAll() {
    const sql = `SELECT * FROM Cars`
    return this.dao.all(sql)
  }

  getById(id) {
    return this.dao.get(
      `SELECT * FROM Cars WHERE id = ?`,
      [id])
  }


  //INSERT DATA
  insert(latitude,longitude, matricula) {
    return this.dao.run(
      'INSERT INTO Cars (latitude, longitude, matricula) VALUES (?, ?, ?)',
      [latitude, longitude, matricula])
  }


  //UPDATE DATA
  update(id, latitude, longitude, matricula) {
    return this.dao.run(
      `UPDATE Cars
      SET latitude = ?,
        longitude = ?,
        matricula = ?
      WHERE id = ?`,
      [latitude, longitude, matricula, id]
    )
  }


  //DELETE DATA
  delete(id) {
    return this.dao.run(
      `DELETE FROM Cars WHERE id = ?`,
      [id]
    )
  }

}

module.exports = Queries;