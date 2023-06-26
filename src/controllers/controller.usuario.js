import modelUsuario from "../models/model.usuario.js";
import {createJWT} from "../config/token.js";
import bcrypt from "bcrypt";

function Login(req, res){
    
    modelUsuario.Login(req.body.email, async function(err, result){
        if (err) {
            res.status(500).send(err);
        } else if (result.length == 0) {
            res.status(401).json({erro: "E-mail ou senha inválida"});
        } else {

            if (await bcrypt.compare(req.body.senha, result[0].senha)) {
                let resultado = result[0];
                resultado["token"] = createJWT(result[0].id_usuario);

                delete resultado.senha;

                res.status(200).json(resultado);
            } else {
                res.status(401).json({erro: "E-mail ou senha inválida"});
            }
           
        }
    });    
}

function Inserir(req, res){
    
    modelUsuario.Inserir(req.body, function(err, result){
        if (err) {
            res.status(500).send(err);
        } else {
            let resultado = result;
            resultado["token"] = createJWT(result.id_usuario);

            res.status(201).json(resultado);
        }
    });
    
}

function ListarId(req, res){
  
    if (req.params.id_usuario != req.id_usuario) {
        return res.status(401).json({erro: "Operação não permitida (obter informações de outro usuário)"});
    }

    modelUsuario.ListarId(req.params.id_usuario, function(err, result){
        if (err) {
            res.status(500).send(err);
        } else {          
            res.status(200).json(result[0]);
        }
    });   
}

function Editar(req, res){
    
    modelUsuario.Editar(req.id_usuario, req.body.nome, req.body.email, function(err, result){
        if (err) {
            res.status(500).send(err);
        } else {          
            res.status(200).json({id_usuario: req.id_usuario});
        }
    });   
}

function ListarEnderecos(req, res){
  
    modelUsuario.ListarEnderecos(req.id_usuario, req.params.id_endereco,
        req.query.cod_cidade, function(err, result){
        if (err) {
            res.status(500).send(err);
        } else {          
            res.status(200).json(result);
        }
    });   
}

function InserirEndereco(req, res){
    
    modelUsuario.InserirEndereco(req.id_usuario, req.body, function(err, result){
        if (err) {
            res.status(500).send(err);
        } else {            
            res.status(201).json({id_endereco: result.insertId});
        }
    });
    
}

function EditarEndereco(req, res){
    
    modelUsuario.EditarEndereco(req.id_usuario, req.params.id_endereco,
            req.body, function(err, result){
        if (err) {
            res.status(500).send(err);
        } else {            
            res.status(200).json({id_endereco: req.params.id_endereco});
        }
    });
    
}

function ExcluirEndereco(req, res){
    
    modelUsuario.ExcluirEndereco(req.params.id_endereco, req.id_usuario, function(err, result){
        if (err) {
            res.status(500).send(err);
        } else {            
            res.status(200).json({id_endereco: req.params.id_endereco});
        }
    });
    
}

function EnderecoPadrao(req, res){
    
    modelUsuario.EnderecoPadrao(req.params.id_endereco, req.id_usuario, function(err, result){
        if (err) {
            res.status(500).send(err);
        } else {            
            res.status(200).json({id_endereco: req.params.id_endereco});
        }
    });
    
}

export default {Login, Inserir, ListarId, Editar, ListarEnderecos, InserirEndereco,
    EditarEndereco, ExcluirEndereco, EnderecoPadrao};