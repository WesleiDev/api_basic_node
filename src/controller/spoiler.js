const Spoiler = require('../model/spoiler')
const status = require('http-status');

//Middleware
exports.buscarUm = (request, response, next) => {
    const id = request.params.id;

    console.log('Buscar pelo ID: ', 1)

    try{
        Spoiler.findByPk(id)
        .then(spoiler =>{
            if(spoiler){
                response.send(spoiler)
            }else{
                response.status(status.NOT_FOUND).send()
            }            
        })
        .catch(error => next(error))
    }catch(e){
        console.log('ERRO pelo ID: ', e)
    }
    

}

exports.buscaTodos = (request, response, next) => {
    let limite = parseInt(request.query.limite || 0);
    let pagina = parseInt(request.query.pagina || 0);

    if(!Number.isInteger(limite) || !Number.isInteger(pagina)){
        response.status(status.BAD_REQUEST).send();
    }

    const ITENS_POR_PAGINA = 10;

    limite = (limite > ITENS_POR_PAGINA || limite <= 0) ? ITENS_POR_PAGINA : limite;
    pagina = (pagina <= 0) ? 0 : pagina * limite;

    Spoiler.findAll({limit: limite, offset: pagina})
        .then(spoilers => {
            response.send(spoilers)
        })
        .catch(error => {
            console.log('ERRO: ', error)
            return next(error)
        })
}

exports.criar = (request, response, next) => {
    const titulo        = request.body.titulo;
    const espoliador    = request.body.espoliador;
    const descricao     = request.body.descricao;

    console.log(request.body)

    Spoiler.create({
        titulo: titulo,
        espoliador : espoliador,
        descricao: descricao
    })
    .then(() => {
        response.status(201).send()
    })
    .catch(error => next(error))
}

exports.atualizar = (request, response, next) => {
    const id = request.params.id;
    console.log('Vai atualizar')

    const titulo        = request.body.titulo;
    const espoliador    = request.body.spoliador;
    const descricao     = request.body.descricao;
    
    Spoiler.findByPk(id)
    .then(spoiler => {
        if(spoiler){
            Spoiler.update({
                titulo: titulo,
                espoliador: espoliador,
                descricao: descricao
            },
            { where : { id: id} }
            )
            .then(() =>{
                response.send();
            })
        }else{
            response.status(status.NOT_FOUND).send('Não encontrou para atualizar');
        }
    })
    .catch(error => next(error))
    
}

exports.excluir = (request, response, next) => {
    const id = request.params.id;

    Spoiler.findByPk(id)
        .then(spoiler => {
            if(spoiler){
                Spoiler.destroy({
                    where: {id: id}
                })
                .then(() =>{
                    response.send();
                })
            }else{
                response.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error))
}