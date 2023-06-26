import express from "express";
import cors from "cors";
import fs from "fs";
import https from "https";

import routeUsuario from "./routes/route.usuario.js";
import routeCategoria from "./routes/route.categoria.js";
import routeBanner from "./routes/route.banner.js";
import routeCidade from "./routes/route.cidade.js";
import routeCupom from "./routes/route.cupom.js";
import routeEstabelecimento from "./routes/route.estabelecimento.js";
import routeProduto from "./routes/route.produto.js";
import routePedido from "./routes/route.pedido.js";

const app = express();

// Middleware JSON
app.use(express.json());

// Middleware CORS
app.use(cors());

// Rotas
app.use(routeUsuario);
app.use(routeCategoria);
app.use(routeBanner);
app.use(routeCidade);
app.use(routeCupom);
app.use(routeEstabelecimento);
app.use(routeProduto);
app.use(routePedido);

const port = process.env.PORT || 8082;

app.listen(port, function(){
    console.log("Servidor rodando na porta: " + port);
});


//------------------------------------

/*
const portHTTPS = 443;
const options = {
    key: fs.readFileSync("C:\\Certbot\\live\\api.deliverymais.com.br\\privkey.pem"),
    cert: fs.readFileSync("C:\\Certbot\\live\\api.deliverymais.com.br\\cert.pem")
}

const serverHTTPS = https.createServer(options, app);
serverHTTPS.listen(portHTTPS);
*/

