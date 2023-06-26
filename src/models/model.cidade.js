import {db} from "../config/database.js";

function Listar(callback){
    let ssql = "select cod_cidade, cidade, uf ";    
    ssql += "from tab_cidade ";
    ssql += "order by cidade ";

    db.query(ssql, [], function(err, result){
        callback(err, result);
    });
}

export default {Listar};