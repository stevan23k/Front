import React, { useEffect, useState, useSyncExternalStore } from 'react'
import {Socket, io} from "socket.io-client"

const socket = io('http://localhost:3000')
const Inicio = () => {
    const [itsConnect,setItsConnect] = useState();
    const [Nmensaje,setNmensaje] = useState("");
    const [mensaje,setmensaje] = useState([]);

    const enviarmensaje=()=>{
        socket.emit("chat_mensaje",{
            usuario: socket.id, 
            texto: Nmensaje})
    }
    useEffect(()=>{

        socket.on("connect", ()=> setItsConnect(true))
        
        socket.on("chat_mensaje",(data)=>{
            setmensaje(mensaje => [...mensaje,data])
        })
        return() =>{
            socket.off("connect")
            socket.off("chat_mensaje")
        }

    },[])
    return (
    <div>
        <h2> {itsConnect ? "conectado": "no conectado"} </h2>
        <div>
            <ul>
                {mensaje.map(mensaje=>(
                    <li>{mensaje.usuario}: {mensaje.texto} </li>
                ))}
            </ul>
        </div>
        <div>
            <input type="text" onChange={e=> setNmensaje(e.target.value)}/>
            <button onClick={enviarmensaje}> enviar</button>
        </div>
    </div>
  )
}

export default Inicio
