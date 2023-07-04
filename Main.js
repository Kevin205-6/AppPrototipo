import express from "express";
import morgan from "morgan";
import { Server as SocketServer} from "socket.io";
import http from 'http';
import cors from 'cors';
import { Encriptar,Desencriptar } from './server/js/Controllers/Security.js'
import { Esp32, Arduino, parserArduino, parserEsp32 } from "./server/js/Controllers/ComunicacionSerial.js";
import { port, mensaje } from "./server/js/Config.js";


const app = express();
const server = http.createServer(app);
const io = new SocketServer(server,{
    cors: {
        origin:"*"
    }
});

const objeto = {
        num : 2,
        infoAlumno: {
            Nombre: "Kevin",
            Matricula: "20011462",
            Semestre: "6",
            Grupo: "A"
        }
};

app.use(cors());
app.use(morgan('dev'));

io.on('connection', (socket)=>{
    console.log('Usuario conectado: ' + socket.id);
    //io.emit('prueba', objeto);
});

let cont = 0
parserArduino.on('data',(data)=>{
    if(cont >= 2){
        var matricula = data.toString();
        console.log(matricula);
        Esp32.write(matricula.replace('\r', ''));
        //io.emit('prueba', objeto);
        //console.log("Mesaje enviado: " + matricula);
        //console.log("Mesaje enviado: " + Desencriptar(matricula));
    }
    cont ++;
});

parserEsp32.on('data', (data)=>{
    console.log('Esp32: ' + data);
    let objet = JSON.parse(Desencriptar(data));
    console.log(objet)
    io.emit("prueba", objet)
});

server.listen(port, ( )=>{
    console.log("Escuchado puerto: " + port);
});


