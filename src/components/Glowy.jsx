import { useEffect, useState, useRef } from "react"

export default function Glowy(){
    const [
        [listening, setListening],
        [posX, setPosX],
        [posY, setPosY],
    ] = [
        useState(false),
        useState(0),
        useState(0),
    ]
    const glowyElement = useRef(null)


    useEffect(() => {
        if(listening){return}
        setListening(true)
    }, [])

    useEffect(() => {
        if(!listening){return}
        document.querySelector("html").addEventListener("mousemove", (e) => {
            setPosX(e.clientX)
            setPosY(e.clientY)
            glowyElement.current.animate([
                {opacity: 1},
                {opacity: 0},
            ], 300)
        })
    }, [listening])

    return (
        <div ref={glowyElement} className="glowy" style={{
            top: `${posY}px`, 
            left: `${posX}px`
        }}></div>
    )
}