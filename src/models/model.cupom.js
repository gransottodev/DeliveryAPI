import {db} from "../config/database.js";

function Validar(cod_cupom, valor, id_estabelecimento, callback){
    let ssql = "select c.id_cupom, c.cod_cupom, c.descricao, c.vl_cupom, c.porc_cupom, ";
    ssql += "c.vl_min_pedido, c.dt_validade, c.ind_ativo ";
    ssql += "from tab_cupom c ";    
    ssql += "join tab_estabelecimento e on (e.id_cupom = c.id_cupom) ";
    ssql += "where c.ind_ativo = 'S'  ";
    ssql += "and c.vl_min_pedido <= ? ";
    ssql += "and c.dt_validade >= current_date() ";
    ssql += "and c.cod_cupom = ? ";
    ssql += "and e.id_estabelecimento = ? ";

    db.query(ssql, [valor/100, cod_cupom, id_estabelecimento], function(err, result){
        callback(err, result);
    });
}

export default {Validar};