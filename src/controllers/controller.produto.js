import modelProduto from "../models/model.produto.js";

function ListarProdutoId(req, res){
    modelProduto.ListarProdutoId(req.params.id_produto, function(err, result){
        if (err){
            res.status(500).send(err);
        } else {
            res.status(200).json(result[0]);
        }
    });
}

function Cardapio(req, res){
    modelProduto.Cardapio(req.params.id_estabelecimento, function(err, result){
        if (err){
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}

function ListarOpcao(req, res){
    modelProduto.ListarOpcao(req.params.id_produto, function(err, result){
        if (err){
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}

export default {ListarProdutoId, Cardapio, ListarOpcao};