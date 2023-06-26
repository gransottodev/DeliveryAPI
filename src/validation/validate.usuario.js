import {db, executeQuery} from "../config/database.js";

function Login(req, res, next){
    let erros = [];

    !req.body.email && erros.push("E-mail não informado");
    !req.body.senha && erros.push("Senha não informada");
    
    if (erros.length > 0){
        return res.status(400).json({erro: erros.join(", ")});
    } else {
        next();
    }
}

async function Inserir(req, res, next){
    let erros = [];

    !req.body.nome && erros.push("Nome não informado")
    !req.body.email && erros.push("E-mail não informado");
    !req.body.senha && erros.push("Senha não informada");
    !req.body.endereco && erros.push("Endereço não informado");
    !req.body.bairro && erros.push("Bairro não informado");
    !req.body.cidade && erros.push("Cidade não informada");
    !req.body.uf && erros.push("Estado (UF) não informado");
    !req.body.cep && erros.push("CEP não informado");
    !req.body.cod_cidade && erros.push("Cód. cidade não informado");
    
    if (req.body.email){
        let emailExiste = await executeQuery(db, "select email from tab_usuario where email=?", [req.body.email]);

        emailExiste.length > 0 && erros.push("E-mail já está em uso");
    }

    if (erros.length > 0){
        return res.status(400).json({erro: erros.join(", ")});
    } else {
        next();
    }
}

function InserirEndereco(req, res, next){
    let erros = [];

    !req.body.endereco && erros.push("Endereço não informado");
    !req.body.bairro && erros.push("Bairro não informado");
    !req.body.cidade && erros.push("Cidade não informada");
    !req.body.uf && erros.push("Estado (UF) não informado");
    !req.body.cep && erros.push("CEP não informado");
    !req.body.cod_cidade && erros.push("Cód. cidade não informado");       

    if (erros.length > 0){
        return res.status(400).json({erro: erros.join(", ")});
    } else {
        next();
    }
}

function EditarEndereco(req, res, next){
    let erros = [];

    !req.body.endereco && erros.push("Endereço não informado");
    !req.body.bairro && erros.push("Bairro não informado");
    !req.body.cidade && erros.push("Cidade não informada");
    !req.body.uf && erros.push("Estado (UF) não informado");
    !req.body.cep && erros.push("CEP não informado");
    !req.body.cod_cidade && erros.push("Cód. cidade não informado");       

    if (erros.length > 0){
        return res.status(400).json({erro: erros.join(", ")});
    } else {
        next();
    }
}

function Editar(req, res, next){
    let erros = [];

    !req.body.nome && erros.push("Nome não informado");
    !req.body.email && erros.push("Email não informado");

    if (erros.length > 0){
        return res.status(400).json({erro: erros.join(", ")});
    } else {
        next();
    }
}

export default {Login, Inserir, InserirEndereco, Editar, EditarEndereco}