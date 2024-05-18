import { useEffect, useRef } from "react"

export default function GlowyTrail({x, y, xOff, yOff, color}) {
    const trailElement = useRef(null)
    
    useEffect(() => {
        setTimeout(() => {
            trailElement.current.remove()
        }, 1000);
        trailElement.current.animate([
            {opacity: 1},
            {opacity: 0}
        ], 1000)
    }, [])
    return (<div ref={trailElement} className="trail-element" style={{
        top: `calc(${y}px + var(--general-size-factor-px) * ${yOff})`,
        left: `calc(${x}px + var(--general-size-factor-px) * ${xOff})`,
        backgroundColor: color
    }}></div>)
}