import { useEffect, useRef } from "react"
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

    const spinnerRefElement = useRef(null)
    useEffect(() => {

    }, [])

    return (
        <div className="mouse-over-spinner-container">
            <div className="mouse-over-spinner" ref={spinnerRefElement}>
                {textArray.map((text, index) => 
                    <div
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
                    >{Object.keys(text)}</div>
                )}
            </div>
        </div> 
    )
}