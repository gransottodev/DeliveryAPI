import {config} from 'dotenv'
import mysql from "mysql";
config()

// Conexao com o banco...
const db = mysql.createPool({
    connectionLimit: 10,
    host: `${process.env.HOST}`,
    user: `${process.env.USER}`,
    password: `${process.env.PASSWORD}`,
    database: `${process.env.DATABASE}`
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