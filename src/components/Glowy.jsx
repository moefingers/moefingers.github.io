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
        console.log(posX, posY)
    }, [posX, posY])

    useEffect(() => {
        if(!listening){return}
        document.querySelector("html").addEventListener("mousemove", (e) => {
            setPosX(e.clientX)
            setPosY(e.clientY)

        })
    }, [listening])

    return (
        <div ref={glowyElement} className="glowy" style={{ transition: "unset", top: `${posY}px`, left: `${posX}px`}}></div>
    )
}