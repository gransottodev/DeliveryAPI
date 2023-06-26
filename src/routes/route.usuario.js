import {Router} from "express";
import controllerUsuario from "../controllers/controller.usuario.js";
import {verifyJWT} from "../config/token.js";
import validate from "../validation/validate.usuario.js";

const routeUsuario = Router();

routeUsuario.get("/v1/usuarios/enderecos/:id_endereco", verifyJWT, controllerUsuario.ListarEnderecos);
routeUsuario.get("/v1/usuarios/enderecos", verifyJWT, controllerUsuario.ListarEnderecos);
routeUsuario.post("/v1/usuarios/enderecos", [verifyJWT, validate.InserirEndereco], controllerUsuario.InserirEndereco);
routeUsuario.patch("/v1/usuarios/enderecos/:id_endereco", [verifyJWT, validate.EditarEndereco], controllerUsuario.EditarEndereco);
routeUsuario.delete("/v1/usuarios/enderecos/:id_endereco", verifyJWT, controllerUsuario.ExcluirEndereco);
routeUsuario.patch("/v1/usuarios/enderecos/padrao/:id_endereco", verifyJWT, controllerUsuario.EnderecoPadrao);

routeUsuario.post("/v1/usuarios/login", validate.Login, controllerUsuario.Login);
routeUsuario.post("/v1/usuarios/registro", validate.Inserir, controllerUsuario.Inserir);
routeUsuario.get("/v1/usuarios/:id_usuario", verifyJWT, controllerUsuario.ListarId);
routeUsuario.patch("/v1/usuarios", [verifyJWT, validate.Editar], controllerUsuario.Editar);


export default routeUsuario;
