import AES from 'crypto-js/aes.js'
import Cryptojs from 'crypto-js'

export function Encriptar(message){
    var encriptado = AES.encrypt(message, 'secret key 354');
    return encriptado.toString()
}

export function Desencriptar(message){
    var desencriptado = AES.decrypt(message, 'secret key 354');
    var textOriginal = desencriptado.toString(Cryptojs.enc.Utf8);
    return textOriginal;
}