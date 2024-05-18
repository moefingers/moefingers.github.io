import { useEffect, useRef } from "react"

export default function GlowyTrail({x, y, xOff, yOff, color}) {
    const trailElement = useRef(null)
    
    useEffect(() => {
        setTimeout(() => {
            trailElement.current.remove()
        }, 1000);
        trailElement.current.animate([
            {opacity: 1, transform: "scale(1)"},
            {
                opacity: 0, 
                transform: `scale(0)`, 
                top: `calc(${y}px + var(--general-size-factor-px) * ${yOff * 1.6})`, 
                left: `calc(${x}px + var(--general-size-factor-px) * ${xOff * 1.6})`
            },
        ], {duration: 1000, easing: "linear"})
    }, [])
    return (<div ref={trailElement} className="trail-element" style={{
        top: `calc(${y}px + var(--general-size-factor-px) * ${yOff})`,
        left: `calc(${x}px + var(--general-size-factor-px) * ${xOff})`,
        backgroundColor: color
    }}></div>)
}