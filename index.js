import express from 'express';
import fs from "fs";

const app = express();
app.get("/",(req,res)=>{
    res.send("hola mundo desde una api con node js!!!")
});
app.listen(3000,()=>{
    console.log('Servidor escuchando en el puerto 3000');
});

