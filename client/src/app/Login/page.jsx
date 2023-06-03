"use client";

import React, {useState} from "react";

export default function LoginComponent(){
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const handleChange = ({target}) =>{
        setUserName(target.value);
        console.log(target.value);
    }
    const handlePasswordChange = ({target}) =>{
        setUserName(target.value);
        console.log(target.value);
    }

    return (
        <div className="LoginComponent">
            UserName: <input onChange={(e) => handleChange(e)} value={userName} />
            Password: <input type="password" onChange={(e) => handlePasswordChange(e)} value={userName} />
            <p> Hello</p>
        </div>
    );
}