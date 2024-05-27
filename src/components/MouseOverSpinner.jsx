import { useEffect, useRef, useState } from "react"
import { useInterval } from "usehooks-ts"
import "../assets/styles/mouse-over-spinner.css"

/*
usage:
textArray = [text, items, to, be, spun]
state = state to be updated by clicking items, if state is specified, may be an array or string
setState = function to update state
stateIsArrayOrString = "string" or "array"


This component will make a spinner of text that will look different if state is specified or not.
Not specifying a state will cause the program to assume the items are not clickable and they will appear static on hover,
and nothing will happen if you click them.

However, specifying a state, setState, and stateType (stateIsArrayOrString) will make the items clickable, and animate on hover.
*/

export default function MouseOverSpinner({textArray, state=false, setState=false, stateIsArrayOrString=null}) {
    // textArray = ["hi", "hello", "hola", "oi", "bruv"]

    const [rotation, setRotation] = useState(0)
    const [speedFactor, setSpeedFactor] = useState(0)
    const [moving, setMoving] = useState(false)

    function handleMouseMoveOnSpinner(event){
        // console.log(event)
        const boundingRect = event.currentTarget.getBoundingClientRect()
        const xPosInBox = (event.clientX - boundingRect.x)
        const xPosFromCenter = xPosInBox - (boundingRect.width / 2)
        const newSpeedFactor = xPosFromCenter / (boundingRect.width / 2)

        // console.log(newSpeedFactor)
        if(newSpeedFactor < .3 && newSpeedFactor > -.3){
            setSpeedFactor(0)
        } else {
            if(newSpeedFactor >= .3){
                setSpeedFactor(newSpeedFactor - .3)
            } else if(newSpeedFactor <= -.3){
                setSpeedFactor(newSpeedFactor + .3)
            }
        }
    }

    useInterval(() => {
        setRotation(rotation + (speedFactor * -10))
    }, moving ? 10 : null)

    return (
        <div className="mouse-over-spinner-container" onMouseMove={handleMouseMoveOnSpinner} onMouseEnter={() => setMoving(true)} onMouseLeave={() => setMoving(false)}>
            
            {textArray.map((text, index) => {
                return (<div style={{
                    // 0.7 * Math.sin((Math.PI * 2 * X) + 1.5) + 0.7  // to have a curve that exceeds 1 across a region around x = 0 rather than at a point
                    // 0.5 * Math.sin((Math.PI * 2 * X) + 1.5) + 0.5 // to have a curve that is at 1 at x = 0
                    opacity: ( 0.7 * Math.sin(Math.PI * 2 * (   Math.abs((rotation % 360) / 360) + (index/textArray.length)   )   + 1.5) ) + 0.7,
                    transform: `
                        translate(-50%, -50%) 
                        rotateX(-20deg)  
                        rotateY(${index * (360 / textArray.length) + rotation}deg) 
                        translateZ(calc(var(--font-size-factor-px) * 36 * pow(${typeof text === "object" ? Object.keys(text).length : text.length}, 0.5))) `}}
                    className={`mouse-over-spinner-item ${state?"clickable":""}
                    ${stateIsArrayOrString === "string" ? (state === Object.values(text)[0] ? "selected" : "") : ""}
                    ${stateIsArrayOrString === "array" ? (state.includes(Object.values(text)[0]) ? "selected" : "") : ""}
                    `} key={index} 
                    onClick={
                        stateIsArrayOrString === "string" ? (() => setState(Object.values(text)[0]))
                        : stateIsArrayOrString === "array" ? (() => 
                            setState(state.includes(Object.values(text)[0])
                                ? state.filter((item) => item !== Object.values(text)[0])
                                : [...state, Object.values(text)[0]]))
                        : null
                    }
                >{typeof text === "object" ? Object.keys(text) : text}</div>)
            })}
            
        </div> 
    )
}