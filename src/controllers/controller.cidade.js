import modelCidade from "../models/model.cidade.js";

function Listar(req, res){
    modelCidade.Listar(function(err, result){
        if (err){
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}

export default {Listar};