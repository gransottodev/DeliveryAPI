import {db} from "../config/database.js";

function ListarProdutoId(id_produto, callback){
    let ssql = "select p.id_produto, p.id_estabelecimento, p.id_categoria, p.nome, p.descricao, ";
    ssql += "p.url_foto, p.vl_produto, p.vl_promocao, p.ind_ativo ";
    ssql += "from tab_produto p ";
    ssql += "where p.id_produto = ? ";

    db.query(ssql, [id_produto], function(err, result){
        callback(err, result);        
    });
}

function Cardapio(id_estabelecimento, callback){
    let ssql = "select p.id_produto, p.id_estabelecimento, p.id_categoria, p.nome, p.descricao, ";
    ssql += "p.url_foto, p.vl_produto, p.vl_promocao, p.ind_ativo, c.categoria ";
    ssql += "from tab_produto p ";
    ssql += "join tab_produto_categoria c on (c.id_categoria = p.id_categoria) ";
    ssql += "where c.ind_ativo = 'S' ";
    ssql += "and p.ind_ativo = 'S' ";
    ssql += "and p.id_estabelecimento = ? ";
    ssql += "order by c.ordem, p.nome";

    db.query(ssql, [id_estabelecimento], function(err, result){
        callback(err, result);        
    });
}

function ListarOpcao(id_produto, callback){
    let ssql = "select o.id_opcao, o.id_produto, o.descricao, o.ind_obrigatorio, o.qtd_max_escolha, ";
    ssql += "o.ind_ativo, o.ordem, i.id_item, i.nome as nome_item, ";
    ssql += "coalesce(i.descricao, '') as descricao_item, coalesce(i.vl_item, 0) as vl_item ";
    ssql += "from tab_produto_opcao o ";
    ssql += "join tab_produto_opcao_item i on (i.id_opcao = o.id_opcao) ";
    ssql += "where o.ind_ativo = 'S' ";
    ssql += "and o.id_produto = ? ";
    ssql += "order by o.ordem, i.ordem, i.nome";

    db.query(ssql, [id_produto], function(err, result){
        callback(err, result);        
    });
}

export default {ListarProdutoId, Cardapio, ListarOpcao};