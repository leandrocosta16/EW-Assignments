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

module.exports.insert = (latitude,longitude, matricula) => {
    return queries.insert(latitude,longitude, matricula)
}

module.exports.update = (id,latitude,longitude, matricula) => {
    return queries.update(id,latitude,longitude, matricula)
}

module.exports.delete = (id) => {
    return queries.delete(id)
}