import modelEstabelecimento from "../models/model.estabelecimento.js";

function Listar(req, res){
    modelEstabelecimento.Listar(req.id_usuario, req.params.id_estabelecimento,
        req.query.id_categoria, req.query.nome, req.query.cod_cidade, 
        req.query.id_banner, req.query.pagina, function(err, result){
        if (err){
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}

function ListarDestaques(req, res){
    modelEstabelecimento.ListarDestaques(req.query.cod_cidade, function(err, result){
        if (err){
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}

function ListarFavoritos(req, res){
    modelEstabelecimento.ListarFavoritos(req.id_usuario, function(err, result){
        if (err){
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}

function InserirFavorito(req, res){
    modelEstabelecimento.InserirFavorito(req.id_usuario, 
            req.body.id_estabelecimento, function(err, result){
        if (err){
            res.status(500).send(err);
        } else {
            res.status(201).json({id_favorito: result.insertId});
        }
    });
}

function ExcluirFavorito(req, res){
    modelEstabelecimento.ExcluirFavorito(req.params.id_favorito, req.id_usuario, function(err, result){
        if (err){
            res.status(500).send(err);
        } else {
            res.status(200).json({id_favorito: req.params.id_favorito});
        }
    });
}

export default {ListarDestaques, ListarFavoritos, InserirFavorito, ExcluirFavorito, Listar};