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

module.exports.minusCar = (id) => {
    return queries.minusCar(id)
}

module.exports.plusCar = (id) => {
    return queries.plusCar(id)
}

module.exports.isInRaio = (radius,latitude,longitude) => {
    let passadeiras = queries.getAll();
    let foundPassadeira = false;
    let passadeira_id = null;
    for (p of passadeiras) {
        if ( radius(latitude,logitude, p.latitude, p.longitude, radius) == true ) {
            foundPassadeira = true;
            passadeira_id = p.id
        }
    }
    return {found: foundPassadeira, passadeira_id: passadeira_id}

    //let closest = queries.closestPassadeira(latitude,longitude)
    //return queries.closestPassadeira(latitude,longitude)
   
}

function radius(lat1, long1, lat2, long2, radius=8) {
/*getDistance(
        { latitude: 51.5103, longitude: 7.49347 },
        { latitude: "51° 31' N", longitude: "7° 28' E" }
    );*/

//returns false or true. radius = meters. checks if lat1 long1 are in a radius of x meters from lat2 long2
geolib.isPointWithinRadius(
    { latitude: lat1, longitude: long1 },
    { latitude: lat2, longitude: long2 },
    radius
);   
}