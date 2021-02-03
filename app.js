//express construye el backend
const express = require("express");
//llamado del express
const app = express();
//comunica el frontend con el backend por medio de apis
const cors = require("cors");
//permite cargar las variables de un archivo .env
const dotenv = require("dotenv");

//permite utilizar todas las propiedades del dotenv
dotenv.config();

//llamado del dbService
const dbService = require("./dbService");

//utiliza las propiedades del cors
app.use(cors());
//envia la información en formato json
app.use(express.json());


//no permite enviar formularios
app.use(express.urlencoded({
    extended: false,
}))

//create
app.post("/insert",(request,response)=>{
const {name} = request.body;
const db = dbService.getDbServiceInstance();

const result = db.insertNewName(name);

    result 
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));

});


//read
app.get("/getAll",(request,response)=>{
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();

    result 
    .then(data => response.json({data: data}))
    .catch(err => console.log(err));
    });




//update
app.patch("/update",(request,response) =>{
    const {id, name} = request.body;
    const db = dbService.getDbServiceInstance();
})



//delete
app.delete("/delete/:id",(request,response) =>{
    //console.log(request.params);
    const{id} = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);

    result
    .then(data => response.json({success: data}))
    .catch(err => console.log(err));
})

app.listen(process.env.PORT,()=>{
    console.log("app is running");
})