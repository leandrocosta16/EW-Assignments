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

  getPassadeira(id) {
    return this.dao.all(
      `SELECT * FROM Cars WHERE passadeira_id = ?`,
      [id])
  }

  getByMatricula(matricula) {
    return this.dao.get(
      `SELECT * FROM Cars WHERE matricula = ?`,
      [matricula])
  }


  //INSERT DATA
  insert(latitude, longitude, matricula, passadeira_id) {
    return this.dao.run(
      'INSERT INTO Cars (latitude, longitude, matricula, passadeira_id) VALUES (?, ?, ?, ?)',
      [latitude, longitude, matricula, passadeira_id])
  }


  //UPDATE DATA
    update(id, latitude, longitude) {
    return this.dao.run(
      `UPDATE Cars
      SET latitude = ?,
        longitude = ?
      WHERE id = ?`,
      [latitude, longitude, id]
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