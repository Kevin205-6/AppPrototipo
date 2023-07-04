/*
    Variables de configuración del programa
*/

const arduino = { 
    path: '/dev/ttyACM0',
    baudRate: 9600 
};

const esp32 = { 
    path: '/dev/ttyUSB0',
    baudRate: 115200 
};

const port = 3004;

const mensaje = {
    num : 0,
    Alumno: null
}

export {
    arduino,
    esp32,
    port,
    mensaje
}