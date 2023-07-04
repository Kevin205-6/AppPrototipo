import AES from 'crypto-js/aes.js'
import Cryptojs from 'crypto-js'

export function Encriptar(message){
    var encriptado = AES.encrypt(message, '354');
    return encriptado.toString()
}

export function Desencriptar(message){
    var desencriptado = AES.decrypt(message, '354');
    var textOriginal = desencriptado.toString(Cryptojs.enc.Utf8);
    return textOriginal;
}