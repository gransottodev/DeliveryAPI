import {db} from "../config/database.js";

function Listar(id_usuario, id_estabelecimento, id_categoria, nome, cod_cidade,
                id_banner, pagina, callback){

   let filtro = [];

   let ssql = "select e.id_estabelecimento, e.nome, e.url_foto, e.url_logo, ";
    ssql += "coalesce(e.avaliacao, 0) as avaliacao, e.id_categoria, ";    
    ssql += "coalesce(e.id_cupom, 0) as id_cupom, e.vl_min_pedido, e.vl_taxa_entrega, ";
    ssql += "e.endereco, coalesce(e.complemento, '') as complemento, ";
    ssql += "e.bairro, e.cidade, e.uf, e.cep, e.cod_cidade, e.ind_ativo, ";
    ssql += "coalesce(e.qtd_avaliacao, 0) as qtd_avaliacao,  ";
    ssql += "coalesce(f.id_favorito, 0) as id_favorito, coalesce(u.descricao, '') as texto_cupom, "
    ssql += "c.categoria ";
    ssql += "from tab_estabelecimento e ";
    ssql += "join tab_categoria c on (c.id_categoria = e.id_categoria) ";
    ssql += "left join tab_usuario_favorito f on (f.id_estabelecimento = e.id_estabelecimento and f.id_usuario = ?) ";
    ssql += "left join tab_cupom u on (u.id_cupom = e.id_cupom and u.ind_ativo = 'S' and u.dt_validade >= current_date()) ";

    if (id_banner > 0) {
        ssql += "join tab_banner_estabelecimento b on (b.id_estabelecimento = e.id_estabelecimento) ";
    }

    ssql += "where e.ind_ativo = 'S' ";

    filtro.push(id_usuario);

    if (id_estabelecimento > 0) {
        ssql += "and e.id_estabelecimento = ? ";
        filtro.push(id_estabelecimento);
    }

    if (id_categoria > 0) {
        ssql += "and e.id_categoria = ? ";
        filtro.push(id_categoria);
    }

    if (nome?.length > 0) {
        ssql += "and e.nome like ? ";
        filtro.push('%'+nome+'%');
    }

    if (cod_cidade) {
        ssql += "and e.cod_cidade = ? ";
        filtro.push(cod_cidade);
    }

    if (id_banner > 0) {
        ssql += "and b.id_banner = ? ";
        filtro.push(id_banner);
    }

    ssql += "order by e.nome ";

    if (pagina) {
        ssql += "limit ?, ? ";  // offset, qtd_registros
        filtro.push((pagina - 1) * 10); // pagina a ser exibida
        filtro.push(10); // registros por pagina
    }

    db.query(ssql, filtro, function(err, result){
        callback(err, result);
    });
}

function ListarDestaques(cod_cidade, callback){
    let ssql = "select d.descricao, e.id_estabelecimento, e.nome, e.url_logo, e.avaliacao, c.categoria ";    
    ssql += "from tab_destaque d "
    ssql += "join tab_destaque_estabelecimento de on (de.id_destaque = d.id_destaque) ";
    ssql += "join tab_estabelecimento e on (e.id_estabelecimento = de.id_estabelecimento) ";
    ssql += "join tab_categoria c on (c.id_categoria = e.id_categoria) ";
    ssql += "where d.ind_ativo = 'S' ";
    ssql += "and e.cod_cidade = ? ";
    ssql += "order by d.ordem ";

    db.query(ssql, [cod_cidade], function(err, result){
        callback(err, result);
    });
}

function ListarFavoritos(id_usuario, callback){
    
    let ssql = "select f.id_favorito, e.id_estabelecimento, e.nome, e.url_logo, e.avaliacao, ";
    ssql += "c.categoria, e.endereco, e.complemento, e.bairro, e.cidade, e.cod_cidade ";
    ssql += "from tab_usuario_favorito f ";
    ssql += "join tab_estabelecimento e on (f.id_estabelecimento = e.id_estabelecimento) ";
    ssql += "join tab_categoria c on (c.id_categoria = e.id_categoria) ";
    ssql += "where f.id_usuario = ? ";
    ssql += "order by e.nome ";

    db.query(ssql, [id_usuario], function(err, result){
        callback(err, result);
    });
}

function InserirFavorito(id_usuario, id_estabelecimento, callback){
    
    let ssql = "insert into tab_usuario_favorito(id_usuario, id_estabelecimento) values(?, ?) ";

    db.query(ssql, [id_usuario, id_estabelecimento], function(err, result){
        callback(err, result);
    });
}

function ExcluirFavorito(id_favorito, id_usuario, callback){
    
    let ssql = "delete from tab_usuario_favorito where id_favorito = ? and id_usuario = ? ";

    db.query(ssql, [id_favorito, id_usuario], function(err, result){
        callback(err, result);
    });
}

export default {ListarDestaques, ListarFavoritos, InserirFavorito, ExcluirFavorito, Listar};