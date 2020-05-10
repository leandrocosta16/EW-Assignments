var Filme = require('../models/filmes');

// Devolve a lista de filmes
module.exports.listar = (pageLimit, pageSkip) => {
    return Filme
        .find()
        .sort({$natural:-1})
        .skip(pageSkip)
        .limit(pageLimit)
        .exec()
}

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
