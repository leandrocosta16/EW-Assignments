class Queries {
  constructor(dao) {
    this.dao = dao
  }

  //READ DATA
  getAll() {
    const sql = `SELECT * FROM Passadeiras`
    return this.dao.all(sql)
  }

  getById(id) {
    return this.dao.get(
      `SELECT * FROM Passadeiras WHERE id = ?`,
      [id])
  }


  //INSERT DATA
  insertPassadeira(latitude,longitude) {
    return this.dao.run(
      'INSERT INTO Passadeiras (latitude, longitude) VALUES (?, ?)',
      [latitude, longitude])
  }


  //UPDATE DATA
  update(id, latitude, longitude) {
    return this.dao.run(
      `UPDATE Passadeiras
      SET latitude = ?,
        longitude = ?
      WHERE id = ?`,
      [latitude, longitude, id]
    )
  }


  //DELETE DATA
  delete(id) {
    return this.dao.run(
      `DELETE FROM Passadeiras WHERE id = ?`,
      [id]
    )
  }

}

module.exports = Queries;