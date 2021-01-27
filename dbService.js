const mysql = require("mysql");
const dotenv = require("dotenv");
let instance = null;
const result = dotenv.config();

if (result.err) {
    throw result.err
}
console.log(result.parsed);
console.log(process.env.USER);

const connection = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port:process.env.DB_PORT
});

connection.connect((err)=>{
    if (err) {
        console.log(err.message);
    }
    console.log("db" + connection.state);
});

class DbService{
    static getDbServiceInstance(){
        return instance ? instance: new DbService();
    }

    async getAllData(){
        try{
            const response = await new Promise((
                resolve,reject
            ) =>{
                const query = "SELECT * FROM nombres;";
                connection.query(query,(err,result) =>{
                    if (err) {reject(new Error(err.message));}
                    resolve (result);
                })
            })
            return response
        }
        catch (error){
            console.log(error);
        }
    }
}
module.exports = DbService;