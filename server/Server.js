
import express from "express";
import morgan from "morgan";
import { Server as SocketServer} from "socket.io";
import http from 'http';
import cors from 'cors';
import { Encriptar,Desencriptar } from './js/Controllers/Security.js'
import { Esp32, Arduino, parserArduino, parserEsp32 } from "./js/Controllers/ComunicacionSerial.js";
import { port, mensaje } from "./js/Config.js";


const app = express();
const server = http.createServer(app);
const io = new SocketServer(server,{
    cors: {
        origin:"*"
    }
});



app.use(cors());
app.use(morgan('dev'));

io.on('connection', (socket)=>{
    console.log('Usuario conectado: ' + socket.id);
    //io.emit('prueba', objeto);
});

let cont = 0
parserArduino.on('data',(data)=>{
    if(cont >= 2){
        var dato = data.toString();
        var matricula = dato.replace('\r', '');
        Esp32.write(matricula);
        const objeto = {
            Num : 2,
            Alumno: null
        };
        io.emit('prueba', objeto);
        //console.log("Mesaje enviado: " + matricula);
        //console.log("Mesaje enviado: " + Desencriptar(matricula));
    }
    cont ++;
});

parserEsp32.on('data', (data)=>{
    let objet = JSON.parse(data);
    console.log(objet)
    io.emit("prueba", objet)
    setTimeout(()=>{
        const objeto = {
            Num : 1,
            Alumno: null
        };
        io.emit('prueba', objeto);
    }, 2000)
});

server.listen(port, ( )=>{
    console.log("Escuchado puerto: " + port);
});


