import modelPedido from "../models/model.pedido.js";

function Listar(req, res){
    modelPedido.Listar(req.id_usuario, function(err, result){
        if (err){
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}

function AvaliarPedido(req, res){
    modelPedido.AvaliarPedido(req.params.id_pedido, req.body.avaliacao, function(err, result){
        if (err){
            res.status(500).send(err);
        } else {
            res.status(200).json({id_pedido: req.params.id_pedido});
        }
    });
}

function Inserir(req, res){
    modelPedido.Inserir(req.id_usuario, req.body, function(err, result){
        if (err){
            res.status(500).send(err);
        } else {
            res.status(201).json({id_pedido: result.insertId});
        }
    });
}

export default {Listar, AvaliarPedido, Inserir};