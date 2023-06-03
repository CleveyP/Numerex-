"use client";
import { io } from 'socket.io-client';
import React, {useState} from "react";

export default function LoginComponent(){
    let socket = io("http://localhost:8080"); //TODO: after deploying, make it right.
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = ({target}) =>{
        setUserName(target.value);
        console.log(target.value);
    }
    const handlePasswordChange = ({target}) =>{
        setPassword(target.value);
        console.log(target.value);
    }
    const handleLogin = () => {
        socket.emit('login-event', userName);
    }

    return (
        <div className="LoginComponent">
            UserName: <input onChange={(e) => handleChange(e)} value={userName} />
            Password: <input type="password" onChange={(e) => handlePasswordChange(e)} value={password} />
            <button onClick={handleLogin} >Login</button>
        </div>
    );
}