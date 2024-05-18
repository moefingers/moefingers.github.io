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
        useState(false),
        useState(0),
        useState(0),
        useState(true),
        useState(false),
        useState([]),
    ]


    
    // const glowyElement = useRef(null)


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
            // glowyElement.current.animate([
            //     {opacity: 1},
            //     {opacity: 0},
            // ], 200)
            setAllowTrail(true)
        })

        function handleMouseUp(){
            setMouseDown(false)
            html.removeEventListener("mouseup", handleMouseUp, true)
        }
        html.addEventListener("mousedown", (event) => {
            setMouseDown(true)
            html.addEventListener("mouseup", handleMouseUp, true)
        })
    }, [listening])

    useInterval(() => {
        setGlowyTrails([...glowyTrails, 
            <GlowyTrail key={glowyTrails.length} x={posX} y={posY} xOff={0} yOff={0} color="var(--complementary-color-primary)"/>,
            <GlowyTrail key={glowyTrails.length + 1} x={posX} y={posY} xOff={15 - Math.random() * 30} yOff={15 - Math.random() * 30} color={mouseDown ? `var(--complementary-color-tertiary)` : `var(--complementary-color-primary-faded)`}/>,
            <GlowyTrail key={glowyTrails.length + 2} x={posX} y={posY} xOff={15 - Math.random() * 30} yOff={15 - Math.random() * 30} color={mouseDown ? `var(--complementary-color-quaternary)` : `var(--complementary-color-primary)`}/>,
            <GlowyTrail key={glowyTrails.length + 3} x={posX} y={posY} xOff={15 - Math.random() * 30} yOff={15 - Math.random() * 30} color={mouseDown ? `var(--complementary-color-secondary)` : `var(--complementary-color-secondary)`}/>
        ])
        setAllowTrail(false)
    }, allowTrail || mouseDown ? 20 : 1000)

    return (
        <div className="glowy-container">
            <div className="trail-container">
                {...glowyTrails}
            </div>
            
            {/* <div ref={glowyElement} className="glowy" style={{
                top: `${posY}px`, 
                left: `${posX}px`
            }}></div> */}
        </div>
    )
}