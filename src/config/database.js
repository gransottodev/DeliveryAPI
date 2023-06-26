import mysql from "mysql";

// Conexao com o banco...
const db = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "root",
    database: "delivery_mais"
});


async function executeQuery(connection, ssql, parameters) {
    return new Promise((resolve, reject) => {
        connection.query(ssql, parameters, (err, result) => {
             if (err) {
                 return reject(err);                 
             } else {
                return resolve(result);
             }             
        });
    });
 }

db.getConnection(function(err, conn){
    if (err){
        console.log(err);
    } else {
        console.log("Conexão com banco de dados: OK")
    }
});

export {db, executeQuery};