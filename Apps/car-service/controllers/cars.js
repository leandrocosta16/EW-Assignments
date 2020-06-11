const appDAO = require('../models/dao');
const appQueries = require('../models/queries');
const appTables = require('../models/tables');

const dao = new appDAO(':memory:');
const tables = new appTables(dao);
const queries = new appQueries(dao);

tables.createCars();

module.exports.list = () => {
    return queries.getAll()
}

module.exports.one = (id) => {
    return queries.getById(id)
}

module.exports.passadeira = (id) => {
    return queries.getPassadeira(id)
}

module.exports.oneMatricula = (matricula) => {
    return queries.getByMatricula(matricula)
}

module.exports.insert = (latitude,longitude, matricula, passadeira_id) => {
    return queries.insert(latitude,longitude, matricula, passadeira_id)
}

module.exports.update = (id,latitude,longitude) => {
    return queries.update(id,latitude,longitude)
}

module.exports.delete = (id) => {
    return queries.delete(id)
}