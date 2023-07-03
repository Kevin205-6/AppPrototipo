import { SerialPort } from 'serialport';
import { ReadlineParser } from 'serialport';
import { arduino, esp32 } from '../Config.js';

//Variables para conectar esp32

const Esp32 = new SerialPort(esp32);
const parserEsp32 = new ReadlineParser();
Esp32.pipe(parserEsp32);

//Variables para conectar Arduino
const Arduino = new SerialPort(arduino);
const parserArduino = new ReadlineParser();
Arduino.pipe(parserArduino);


export {
    Esp32,
    Arduino,
    parserArduino,
    parserEsp32
}