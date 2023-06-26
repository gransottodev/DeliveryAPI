import modelBanner from "../models/model.banner.js";

function Listar(req, res){
    modelBanner.Listar(req.query.cod_cidade, function(err, result){
        if (err){
            res.status(500).send(err);
        } else {
            res.status(200).json(result);
        }
    });
}

export default {Listar};