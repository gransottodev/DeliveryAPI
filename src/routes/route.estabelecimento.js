import {Router} from "express";
import controllerEstabelecimento from "../controllers/controller.estabelecimento.js";
import {verifyJWT} from "../config/token.js";

const routeEstabelecimento = Router();

routeEstabelecimento.get("/v1/destaques", verifyJWT, controllerEstabelecimento.ListarDestaques);
routeEstabelecimento.get("/v1/estabelecimentos/favoritos", verifyJWT, controllerEstabelecimento.ListarFavoritos);
routeEstabelecimento.post("/v1/estabelecimentos/favoritos", verifyJWT, controllerEstabelecimento.InserirFavorito);
routeEstabelecimento.delete("/v1/estabelecimentos/favoritos/:id_favorito", verifyJWT, controllerEstabelecimento.ExcluirFavorito);

routeEstabelecimento.get("/v1/estabelecimentos/:id_estabelecimento", verifyJWT, controllerEstabelecimento.Listar);
routeEstabelecimento.get("/v1/estabelecimentos", verifyJWT, controllerEstabelecimento.Listar);

export default routeEstabelecimento;
