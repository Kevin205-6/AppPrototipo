import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import nfc from '/img/nfc.png';
import cargando from '/img/cargando.png';
import error from '/img/error.png';
import registrado from '/img/registrado.png';
import { port , ip } from '../Config.js'

import '../../css/App.css'



const socket = io(`http://${ip}:${port}`);


var i = 0;


var Object = {
  num : null,
  infoAlumno: null
}



function App() {
  const [num, setnum] = useState(null);
  const [object, setobject] = useState(null);
  useEffect(()=>{
    
    socket.on('prueba',(data)=>{
      setnum(data.Num);
      setobject(data.Alumno);
      console.log(data)
    });
    return ()=>{
      socket.off();
    }
  });
  return Eleccion(num, object)
}

function Eleccion(num, object){
  
  if(num == 1){
    return (
      <>
          <h1>Pase su tarjeta</h1>
          <img src={nfc} className="image"></img>
      </>
    )
  }else if(num == 2){
    return (
      <>
          <h1>Capturando datos</h1>
          <h2>Espere un momento, se estan <br></br>
              registrando los datos.</h2>
          <img src={cargando} className="image"/>
      </>
  )
  }else if(num == 3){
    return (
      <>
          <h1>Error de registro</h1>
          <h2>
              Vuelva a pasar la identificacion, <br></br>
              lentamente
          </h2>
          <img src={error} className="image"/>
      </>
  )
  }else if(num == 4){
    return (
      <>
          <div>
          <h1>Alumo Registrado</h1>
          <p>Alumno: <span>{object.Nombre}</span></p>
          <p>Matricula: <span>{object.Matricula}</span></p>
          <p>Semestre: <span>{object.Semestre}</span></p>
          <p>Grupo: <span>{object.Grupo}</span></p>
          </div>
          <img src={registrado} className="image"></img>
      </>
  )
  }else{
    return (
      <>
          <h1>Pase su tarjeta</h1>
          <img src="img/nfc.png" className="image"></img>
      </>
    )
  }
}

export default App
