class Queries {
  constructor(dao) {
    this.dao = dao
  }

  //READ DATA
  getAll() {
    const sql = `SELECT * FROM Pedestres`
    return this.dao.all(sql)
  }

  getById(id) {
    return this.dao.get(
      `SELECT * FROM Pedestres WHERE id = ?`,
      [id])
  }

  getByEmail(email) {
    return this.dao.get(
      `SELECT * FROM Pedestres WHERE email = ?`,
      [email])
  }

  //INSERT DATA
  insert(latitude, longitude, email, passadeira_id) {
    return this.dao.run(
      'INSERT INTO Pedestres (latitude, longitude, email, passadeira_id) VALUES (?, ?, ?, ?)',
      [latitude, longitude, email, passadeira_id])
  }


  //UPDATE DATA
  update(id, latitude, longitude) {
    return this.dao.run(
      `UPDATE Pedestres
      SET latitude = ?,
        longitude = ?
      WHERE id = ?`,
      [latitude, longitude, id]
    )
  }


  //DELETE DATA
  delete(id) {
    return this.dao.run(
      `DELETE FROM Pedestres WHERE id = ?`,
      [id]
    )
  }

}

module.exports = Queries;