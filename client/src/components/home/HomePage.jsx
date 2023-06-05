"use client"

import React, { useState, useEffect, useRef } from 'react'

export const HomePage = () => {

    const [userName, setUserName] = useState("");
    const canvasRef = useRef(null);

    const handleChange = ({ target }) => {
        setUserName(target.value);
        console.log(target.value);
    }


    const draw = ctx => {
        ctx.fillStyle = '#0021000'
        ctx.beginPath()
        ctx.arc(50, 100, 20, 0, 2 * Math.PI)
        ctx.fill()
    }

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas) {

            const canvasContext = canvas.getContext('2d');

            draw(canvasContext);
        }

    }, [draw]
    
    
    );


    return (

        <div className='home-container'>

            <h1 className='home-title'> Ink Splash </h1>
            <br />
            <br />

            <div className='home-main-container'>

                <input placeholder='Enter your name...' onChange={(e) => handleChange(e)} value={userName} />
                <p>Draw your profile avatar</p>
                <canvas ref={canvasRef} height={200} style={{ background: 'white' }} />
                <div className='home-buttons'>
                    <button>PLAY</button><br />
                    <button>Create Private Room</button><br />
                    <button>Join Private Room</button><br />
                </div>

            </div>

        </div>

    )
}
