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

//Update contadores
resetCounts(id) {
    return this.dao.run(
      `UPDATE Passadeiras
      SET nPedestrians = 0,
        nCars = 0
      WHERE id = ?`,
      [id]
    )
  }


  //DELETE DATA
  delete(id) {
    return this.dao.run(
      `DELETE FROM Passadeiras WHERE id = ?`,
      [id]
    )
  }

  minusCar(id) {
  console.log(id)
    return this.dao.run(
      `UPDATE Passadeiras SET nCars = nCars-1 WHERE id = ?`,
      [id]
    )
  }

  plusCar(id) {
    return this.dao.run(
      `UPDATE Passadeiras SET nCars = nCars+1 WHERE id = ?`,
      [id]
    )
  }

  minusPedestre(id) {
    return this.dao.run(
      `UPDATE Passadeiras SET nPedestrians = nPedestrians - 1 WHERE id = ?`,
      [id]
    )
  }

  plusPedestre(id) {
    return this.dao.run(
      `UPDATE Passadeiras SET nPedestrians = nPedestrians + 1 WHERE id = ?`,
      [id]
    )
  }



//Ordering by nearest latitude and longitude coordinates
//ORDER BY ((lat-$user_lat)*(lat-$user_lat)) + ((lng - $user_lng)*(lng - $user_lng)) ASC
closestPassadeira2(latitude,longitude) {
    //WHERE (Latitude-x0)*(Latitude-x0) + (Longitude-y0)*(Longitude-y0) < r*r;
    //https://stackoverflow.com/questions/16110189/get-all-items-around-a-certain-point-from-sqlite-database
    return this.dao.run(
      `SELECT *
      FROM Passadeiras
      ORDER BY ((latitude-?)*(latitude-?)) + ((longitude - ?)*(longitude - ?)) ASC`,
      [latitude,latitude,longitude,longitude]
    )
  }


closestPassadeira(latitude,longitude) {
    return this.dao.run(
      `SELECT * FROM Passadeiras ORDER BY ((?-latitude)*(?-latitude)) + ((? - longitude)*(? - longitude)) ASC`,
      [latitude,latitude,longitude,longitude]
    )
  }
  //SELECT * AS distance FROM Passadeiras ORDER BY ABS(latitude - ?) + ABS(longitude - ?) ASC
  //SELECT * AS distance FROM items ORDER BY ((location_lat-lat)*(location_lat-lat)) + ((location_lng - lng)*(location_lng - lng)) ASC



}

module.exports = Queries;
