//var Queries = require('../models/queries');
var db = require('../models/db');

// Devolve a lista de passadeiras
/*module.exports.listar = () => {
    return Db.queryDb()
}*/

module.exports.listar = () => {
    
    var sql = "select * from Passadeiras"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            console.log('ohhhhh')
          res.status(400).json({"error":err.message});
          return
        }
        console.log('newwwwwwwwwww')

        //res.status(200).json({
        res.json({
            "message":"success",
            "dados":rows
        })
      });

}

/*
module.exports.consultar = id => {
    return Filme
        .findOne({_id: id})
        .exec()
}

module.exports.contar = () => {
    return Filme
        .countDocuments()
        .exec()
}

module.exports.inserir = filme => {
    var novo = new Filme(filme)
    return novo.save()
}

module.exports.apagar = idFilme => {
    return Filme
        .findOne({_id: idFilme})
        .remove()
        .exec()
}
*/