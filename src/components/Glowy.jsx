import { useEffect, useState, useRef } from "react"
import { useInterval } from "usehooks-ts"

import GlowyTrail from "./GlowyTrail"

export default function Glowy(){
    const [
        [listening, setListening],
        [posX, setPosX],
        [posY, setPosY],
        [allowTrail, setAllowTrail],
        [mouseDown, setMouseDown],
        [glowyTrails, setGlowyTrails],
    ] = [
        useState(false), // listening only once!
        useState(0), // x
        useState(0), // y
        useState(true), // allow trail? (set by movement or mousedown)
        useState(false), // mouse down?
        useState([]), // glowy trails
    ]

    useEffect(() => {
        if(listening){return}
        setListening(true)
    }, [])

    useEffect(() => {
        const html = document.querySelector("html")
        if(!listening){return}
        html.addEventListener("mousemove", (event) => {
            setPosX(event.clientX)
            setPosY(event.clientY)
            setAllowTrail(true)
        })

        function handleMouseUpOrLeave(){
            setMouseDown(false)
            html.removeEventListener("mouseup", handleMouseUpOrLeave, true)
            html.removeEventListener("mouseleave", handleMouseUpOrLeave, true)
        }
        html.addEventListener("mousedown", (event) => {
            setMouseDown(true)
            html.addEventListener("mouseup", handleMouseUpOrLeave, true)
            html.addEventListener("mouseleave", handleMouseUpOrLeave, true)
        })
    }, [listening])

    useInterval(() => {
        if(allowTrail || mouseDown){
            setGlowyTrails([...glowyTrails, 
                <GlowyTrail key={glowyTrails.length.toString() + 0 + posX.toString() + posY.toString()} x={posX} y={posY} xOff={15 - Math.random() * 30} yOff={15 - Math.random() * 30} color="var(--complementary-color-primary-faded)"/>,
                <GlowyTrail key={glowyTrails.length.toString() + 1 + posX.toString() + posY.toString()} x={posX} y={posY} xOff={15 - Math.random() * 30} yOff={15 - Math.random() * 30} color={mouseDown ? `var(--complementary-color-tertiary)` : `var(--complementary-color-primary-faded)`}/>,
                <GlowyTrail key={glowyTrails.length.toString() + 2 + posX.toString() + posY.toString()} x={posX} y={posY} xOff={15 - Math.random() * 30} yOff={15 - Math.random() * 30} color={mouseDown ? `var(--complementary-color-quaternary)` : `var(--complementary-color-primary-faded)`}/>,
                <GlowyTrail key={glowyTrails.length.toString() + 3 + posX.toString() + posY.toString()} x={posX} y={posY} xOff={15 - Math.random() * 30} yOff={15 - Math.random() * 30} color={mouseDown ? `var(--complementary-color-secondary)` : `var(--complementary-color-secondary)`}/>
            ])
        } else {
            setGlowyTrails([...glowyTrails, 
                <GlowyTrail key={glowyTrails.length + 4} x={posX} y={posY} xOff={15 - Math.random() * 30} yOff={15 - Math.random() * 30} color={mouseDown ? `var(--complementary-color-tertiary)` : `var(--complementary-color-primary-faded)`}/>,
            ])
        }
        
        setAllowTrail(false)
    }, allowTrail || mouseDown ? 20 : 400)

    return (
        <div className="glowy-container">
            <div className="trail-container">
                {...glowyTrails}
            </div>
        </div>
    )
}