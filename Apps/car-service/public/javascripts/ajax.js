function apagarFilme(idFilme){
    console.log('Vou apagar /filmes/: ' + idFilme)
    axios.delete('/filmes/' + idFilme)
        .then(response => window.location.assign('/filmes'))
        .catch(error => console.log(error))
}