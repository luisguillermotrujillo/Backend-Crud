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

});


//read
app.get("/getAll",(request,response)=>{
    response.json({
        success: true
    });
})



//update



//delete

app.listen(process.env.PORT,()=>{
    console.log("app is running");
})