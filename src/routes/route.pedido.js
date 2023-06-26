import {Router} from "express";
import controllerPedido from "../controllers/controller.pedido.js";
import { verifyJWT } from "../config/token.js"

const routePedido = Router();

routePedido.get("/v1/pedidos", verifyJWT, controllerPedido.Listar);
routePedido.post("/v1/pedidos", verifyJWT, controllerPedido.Inserir);
routePedido.patch("/v1/pedidos/avaliacao/:id_pedido", verifyJWT, controllerPedido.AvaliarPedido);

export default routePedido;
