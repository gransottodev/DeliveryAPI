import {db, executeQuery} from "../config/database.js";

function Listar(id_usuario, callback){
    let ssql = "select p.id_pedido, p.id_estabelecimento, e.nome, count(*) as qtd_item, p.vl_total, ";
    ssql += "p.dt_pedido, e.url_logo, coalesce(p.avaliacao, 0) as avaliacao, p.status ";
    ssql += "from tab_pedido p ";
    ssql += "join tab_estabelecimento e on (p.id_estabelecimento = e.id_estabelecimento) ";
    ssql += "left join tab_pedido_item i on (p.id_pedido = i.id_pedido) ";
    ssql += "where p.id_usuario = ? ";
    ssql += "group by p.id_pedido, p.id_estabelecimento, e.nome, p.vl_total, p.dt_pedido, ";
    ssql += "e.url_logo, p.avaliacao, p.status ";
    ssql += "order by p.id_pedido desc ";

    db.query(ssql, [id_usuario], function(err, result){
        callback(err, result);
    });
}

function AvaliarPedido(id_pedido, avaliacao, callback){
    let ssql = "update tab_pedido set avaliacao = ? where id_pedido = ? ";

    db.query(ssql, [avaliacao, id_pedido], function(err, result){
        callback(err, result);
    });
}

function Inserir(id_usuario, jsonPed, callback){
    db.getConnection(function(err, conn){
        
        conn.beginTransaction(async function(err){

            try {
                            
                let ssql = "insert into tab_pedido(id_usuario, id_estabelecimento, id_cupom, vl_taxa_entrega, vl_desconto, ";
                ssql += "vl_total, dt_pedido, status, avaliacao, endereco, complemento, bairro, cidade, uf, cep, cod_cidade) ";
                ssql += "values(?, ?, ?, ?, ?, ?, current_timestamp(), 'A', ?, ?, ?, ?, ?, ?, ?, ?) ";

                // Pedido...
                let pedido = await executeQuery(conn, ssql, [id_usuario, jsonPed.id_estabelecimento, jsonPed.id_cupom,                    
                    jsonPed.vl_taxa_entrega, jsonPed.vl_desconto, jsonPed.vl_total,  
                    jsonPed.avaliacao, jsonPed.endereco, jsonPed.complemento, jsonPed.bairro, 
                    jsonPed.cidade, jsonPed.uf, jsonPed.cep, jsonPed.cod_cidade]);


                let id_pedido = pedido.insertId;


                // Itens...
                for (let i = 0; i < jsonPed.itens.length; i++) {
                    let item = jsonPed.itens[i]; 
                    
                    ssql = "insert into tab_pedido_item(id_pedido, id_produto, descricao, qtd, vl_unit, vl_total) ";
                    ssql += "values(?,?,?,?,?,?)";

                    let ret = await executeQuery(conn, ssql, [id_pedido, item.id_produto,
                                    item.descricao, item.qtd, item.vl_unit, item.vl_total]);

                    let id_pedido_item = ret.insertId;


                    // Detalhes...
                    for (let x = 0; x < item.detalhes.length; x++) {
                        let detalhe = item.detalhes[x];

                        ssql =  "insert into tab_pedido_item_detalhe(id_pedido_item, nome, id_item, vl_item, ordem) ";
                        ssql += "values (?, ?, ?, ?, ?)";

                        await executeQuery(conn, ssql, [id_pedido_item, detalhe.nome, detalhe.id_item, 
                                            detalhe.vl_item, detalhe.ordem]);
                    }
                }                

                conn.commit();
                callback(undefined, pedido);
                
            } catch (error) {
                conn.rollback();
                callback(error, {});
            }

            conn.release();
        });

    });
}

export default {Listar, AvaliarPedido, Inserir};