const appDAO = require('../models/dao');
const appQueries = require('../models/queries');
const appTables = require('../models/tables');

const dao = new appDAO('./data/db.sqlite');
const tables = new appTables(dao);
const queries = new appQueries(dao);

tables.createPassadeiras();

module.exports.list = () => {
    return queries.getAll()
}

module.exports.one = (id) => {
    return queries.getById(id)
}

module.exports.insert = (latitude,longitude) => {
    return queries.insertPassadeira(latitude,longitude)
}

module.exports.update = (id,latitude,longitude) => {
    return queries.update(id,latitude,longitude)
}

module.exports.delete = (id) => {
    return queries.delete(id)
}