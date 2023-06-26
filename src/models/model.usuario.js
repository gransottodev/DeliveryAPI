import {db} from "../config/database.js";
import bcrypt from "bcrypt";

function Login(email, callback){
    let ssql = "select u.id_usuario, u.nome, u.email, u.dt_cadastro, u.senha, ";
    ssql += "e.endereco, e.complemento, e.bairro, e.cidade, e.uf, e.cep, e.cod_cidade ";
    ssql += "from tab_usuario u ";
    ssql += "left join tab_usuario_endereco e on (e.id_usuario = u.id_usuario and e.ind_padrao = 'S' ) ";
    ssql += "where u.email=? ";

    db.query(ssql, [email], function(err, result){
        callback(err, result);        
    });
}

function Inserir(dadosUsuario, callback){
    db.getConnection(function(err, conn){
        
        conn.beginTransaction(async function(err){

            let ssql = "insert into tab_usuario(nome, email, senha, dt_cadastro) ";
            ssql += "values(?, ?, ?, current_timestamp()) ";

            const criptSenha = await bcrypt.hash(dadosUsuario.senha, 10);

            conn.query(ssql, [dadosUsuario.nome, dadosUsuario.email, criptSenha], function(err, result){

                if (err){
                    conn.rollback();
                    callback(err, result);
                } else {

                    const id_usuario = result.insertId;

                    ssql = "insert into tab_usuario_endereco(id_usuario, endereco, complemento,";
                    ssql += "bairro, cidade, uf, cep, ind_padrao, cod_cidade) ";
                    ssql += "values(?, ?, ?, ?, ?, ?, ?, 'S', ?)";

                    conn.query(ssql, [id_usuario, dadosUsuario.endereco, dadosUsuario.complemento,
                        dadosUsuario.bairro, dadosUsuario.cidade, dadosUsuario.uf,
                        dadosUsuario.cep, dadosUsuario.cod_cidade], function(err, result){

                        if (err) {
                            conn.rollback();                        
                            callback(err, result);    
                        } else {
                            conn.commit();                        
                            callback(err, {id_usuario: id_usuario});
                        }

                        conn.release();
                        
                    });

                }

            });

        });

    });
}

function ListarId(id_usuario, callback){
    let ssql = "select id_usuario, nome, email, dt_cadastro from tab_usuario where id_usuario = ?";
    
    db.query(ssql, [id_usuario], function(err, result){
        callback(err, result);        
    });
}

function Editar(id_usuario, nome, email, callback){
    let ssql = "update tab_usuario set nome=?, email=? where id_usuario=? ";

    db.query(ssql, [nome, email, id_usuario], function(err, result){
        callback(err, result);        
    });
}

function ListarEnderecos(id_usuario, id_endereco, cod_cidade, callback){
    let filtro = [];

    let ssql = "select id_endereco, id_usuario, endereco, complemento, bairro, cidade, ";
    ssql += "uf, cep, coalesce(ind_padrao, 'N') as ind_padrao, cod_cidade ";
    ssql += "from tab_usuario_endereco where id_usuario = ? ";

    filtro.push(id_usuario);

    if (id_endereco){
        ssql += "and id_endereco = ? ";
        filtro.push(id_endereco);
    }

    if (cod_cidade){
        ssql += "and cod_cidade = ? ";
        filtro.push(cod_cidade);
    }

    ssql += "order by id_endereco desc ";
    
    db.query(ssql, filtro, function(err, result){
        callback(err, result);        
    });
}

function InserirEndereco(id_usuario, dadosEnd, callback){
    let ssql = "insert into tab_usuario_endereco(id_usuario, endereco, complemento, ";
    ssql += "bairro, cidade, uf, cep, ind_padrao, cod_cidade) ";
    ssql += "values(?, ?, ?, ?, ?, ?, ?, ?, ?) ";

    db.query(ssql, [id_usuario, dadosEnd.endereco, dadosEnd.complemento, 
        dadosEnd.bairro, dadosEnd.cidade, dadosEnd.uf, dadosEnd.cep,
        dadosEnd.ind_padrao, dadosEnd.cod_cidade], function(err, result){
        callback(err, result);        
    });
}

function EditarEndereco(id_usuario, id_endereco, dadosEnd, callback){
    let ssql = "update tab_usuario_endereco set endereco=?, complemento=?, ";
    ssql += "bairro=?, cidade=?, uf=?, cep=?, cod_cidade=? ";
    ssql += "where id_endereco=? and id_usuario=? ";

    db.query(ssql, [dadosEnd.endereco, dadosEnd.complemento, 
        dadosEnd.bairro, dadosEnd.cidade, dadosEnd.uf, dadosEnd.cep,
        dadosEnd.cod_cidade, id_endereco, id_usuario], function(err, result){
        callback(err, result);        
    });
}

function ExcluirEndereco(id_endereco, id_usuario, callback){
    let ssql = "delete from tab_usuario_endereco ";
    ssql += "where id_endereco=? and id_usuario=? ";

    db.query(ssql, [id_endereco, id_usuario], function(err, result){
        callback(err, result);        
    });
}

function EnderecoPadrao(id_endereco, id_usuario, callback){
    db.getConnection(function(err, conn){
        
        conn.beginTransaction(async function(err){

            let ssql = "update tab_usuario_endereco set ind_padrao = 'N' where id_usuario=? ";
            
            conn.query(ssql, [id_usuario], function(err, result){

                if (err){
                    conn.rollback();
                    callback(err, result);
                } else {

                    ssql = "update tab_usuario_endereco set ind_padrao = 'S' ";
                    ssql += "where id_endereco=? and id_usuario=? ";

                    conn.query(ssql, [id_endereco, id_usuario], function(err, result){

                        if (err) {
                            conn.rollback();                        
                            callback(err, result);    
                        } else {
                            conn.commit();                        
                            callback(err, {id_endereco: id_endereco});
                        }

                        conn.release();
                        
                    });

                }

            });

        });

    });
}

export default {Login, Inserir, ListarId, Editar, ListarEnderecos, InserirEndereco,
    EditarEndereco, ExcluirEndereco, EnderecoPadrao};