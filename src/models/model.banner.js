import {db} from "../config/database.js";

function Listar(cod_cidade, callback){
    let ssql = "select id_banner, descricao, foto, ind_ativo, cod_cidade, ordem ";    
    ssql += "from tab_banner ";
    ssql += "where cod_cidade = ? ";

    db.query(ssql, [cod_cidade], function(err, result){
        callback(err, result);
    });
}

export default {Listar};