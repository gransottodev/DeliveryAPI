import {Router} from "express";
import controllerCategoria from "../controllers/controller.categoria.js";
import {verifyJWT} from "../config/token.js";

const routeCategoria = Router();

routeCategoria.get("/v1/categorias", verifyJWT, controllerCategoria.Listar);

export default routeCategoria;
