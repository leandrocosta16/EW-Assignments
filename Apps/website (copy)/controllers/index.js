const geolib = require('geolib');

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

module.exports.isInRaio = (radius,latitude,longitude) => {
    //let closest = queries.closestPassadeira(latitude,longitude)
    return queries.closestPassadeira(latitude,longitude)
    /*getDistance(
        { latitude: 51.5103, longitude: 7.49347 },
        { latitude: "51° 31' N", longitude: "7° 28' E" }
    );*/

/*
// checks if 51.525/7.4575 is within a radius of 5 km from 51.5175/7.4678
geolib.isPointWithinRadius(
    { latitude: 51.525, longitude: 7.4575 },
    { latitude: 51.5175, longitude: 7.4678 },
    5000
);*/

    
}