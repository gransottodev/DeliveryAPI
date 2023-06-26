import {Router} from "express";
import controllerCidade from "../controllers/controller.cidade.js";

const routeCidade = Router();

routeCidade.get("/v1/cidades", controllerCidade.Listar);

export default routeCidade;
