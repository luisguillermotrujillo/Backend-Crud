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

    async insertNewName(name){
        try{
            const dateAdded = new Date();
            const insertId = await new Promise((resolve,reject) =>{
                const query = "INSERT INTO nombres(Name,date_added)VALUES(?,?);";
                connection.query(query,[name, dateAdded],(err,result) =>{
                    if (err) reject (new Error(err.message));
                        resolve (result);
                    
                })
            });
            console.log(insertId);
            //return response;
            return{
                id : insertId,
                Name:name,
                date_added:dateAdded
            }
        }
        catch(error){
            console.log(error);
        }
    }
    async deleteRowById(id){
        try{
            id = parseInt(id,10);
            const response = await new Promise((resolve,reject) =>{
                const query = "DELETE FROM nombres WHERE id = ? ";
                connection.query(query,[id],(err,result) =>{
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            })
            return response === 1 ? true: false ;
            //console.log(response);
        }catch (error){
            console.log(error);
            return false;
        }
    }
    async updateNameById(id, name){
        try{
            id = parseInt(id, 10);
            const response = await new Promise((resolve,reject) =>{
                const query = "UPDATE nombres SET Name = ? WHERE id = ? ";
                connection.query(query,[name, id],(err,result) =>{
                    if (err)reject(new Error(err,message));
                    resolve (result.affectedRows);
                })
            })
            //console.log(response);
            return response === 1 ? true: false; 
        }catch(error){
            console.log(error);
            return false;
        } 
    }
    async searchByName(name){
                try{
                    const response = await new Promise((resolve,reject) =>{
                        const query = "SELECT * FROM nombres WHERE name =?;";
                        connection.query(query,[name],(err,result) =>{
                            if (err)reject(new Error(err.message));
                                resolve(result);
                            
                        })
                    })
                    return response;
                }catch (error){      
                console.log(error);
                }
            }

}

module.exports = DbService;