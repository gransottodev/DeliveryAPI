import {Router} from "express";
import controllerCupom from "../controllers/controller.cupom.js";
import { verifyJWT } from "../config/token.js"

const routeCupom = Router();

routeCupom.get("/v1/cupons/validacao", verifyJWT, controllerCupom.Validar);

export default routeCupom;
