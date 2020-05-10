const mongoose = require('mongoose')

/*
var castSchema = new mongoose.Schema({
    actor: String
})

var genreSchema = new mongoose.Schema({
    type: String
})*/

var filmeSchema = new mongoose.Schema({
    //_id: String,
    title: String,
    year: String,
    cast: [String],
    genres: [String]
  });

module.exports = mongoose.model('filme', filmeSchema)
