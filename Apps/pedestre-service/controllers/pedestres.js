const appDAO = require('../models/dao');
const appQueries = require('../models/queries');
const appTables = require('../models/tables');

const dao = new appDAO(':memory:');
const tables = new appTables(dao);
const queries = new appQueries(dao);

tables.createPedestres();

module.exports.list = () => {
    return queries.getAll()
}

module.exports.one = (id) => {
    return queries.getById(id)
}

module.exports.oneEmail = (email) => {
    return queries.getByEmail(email)
}

module.exports.insert = (latitude,longitude, email, passadeira_id) => {
    return queries.insert(latitude,longitude, email, passadeira_id)
}

module.exports.update = (id,latitude,longitude) => {
    return queries.update(id,latitude,longitude)
}

module.exports.delete = (id) => {
    return queries.delete(id)
}