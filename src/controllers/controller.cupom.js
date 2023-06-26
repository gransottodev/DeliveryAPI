import modelCupom from "../models/model.cupom.js";

function Validar(req, res){
    modelCupom.Validar(req.query.cod_cupom, req.query.valor, 
                    req.query.id_estabelecimento, function(err, result){
        if (err){
            res.status(500).send(err);
        } else if (result.length == 0){
            res.status(404).json({"erro": "Cupom inválido"});
        }else {
            res.status(200).json(result[0]);
        }
    });
}

export default {Validar};