const sqlite3 = require('sqlite3').verbose();

const dbDir = './data/db.sqlite';

let db = new sqlite3.Database(dbDir);

let sqlCreate = `CREATE TABLE IF NOT EXISTS Passadeiras (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  coordX text,
  coordY text
);`;

db.run(sqlCreate, err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Base de dados criada");
});


//Insert teste dummy data (comment out in dev). Como tem idetifiers não cria novos a cada restart do server

let sqlInsert = `INSERT INTO Passadeiras (id, coordX, coordY) VALUES
  (1, '13', '22'),
  (2, '5', '37');`;
  db.run(sqlInsert, err => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Dummy data inserida");
  });

/*db.run(`CREATE TABLE passadeiras (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            coordX text, 
            coordY text
            )`,
            (err) => {
            if (err) {
                // Table was already created, skip
            }else{

                console.log('Base de dados criada.')

            }
        });*/



// open db
//let db = new sqlite3.Database(dbDir, sqlite3.OPEN_READWRITE, (err) => {
/*let db = new sqlite3.Database(dbDir, sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.log('erro');
    console.error(err.message);
    //throw err;
  } else {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE passadeiras (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            coordX text, 
            coordY text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`,
            (err) => {
            if (err) {
                // Table was already created, skip
            }else{

                console.log('A funcionar, 1, 2, teste.')

            }
        });  
    }
});*/

/*        db.run(`CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
            )`*/

/*function queryDb(sql) {
    db.all(sql, [], (err, rows) => {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        console.log(row.name);
      });
    });
}*/

// close db
//db.close()

module.exports = db;

/*let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});


db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});*/
