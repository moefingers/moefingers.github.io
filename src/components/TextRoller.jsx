import { useEffect, useRef, useState } from "react"
import '../assets/styles/text-roller.css'

export default function TextRoller() {

    const rollerTexts = [
        "Software Engineer", 
        "Frontend Developer", 
        "Full Stack Developer",
        "Backend Developer",
        "Friend",
        "Advisor"
    ]
    const [textRollerItems, setTextRollerItems] = useState([])

    useEffect(() => {
        const rollerElements = rollerTexts.map((text, index) => {
            return <div key={index} className="text-roller-item" style={{
                transform: `rotateX(${index * (360 / rollerTexts.length)}deg) rotateZ(0deg) rotateY(0deg) translate3d(0, 0, 25px)`,
                // top: `calc(var(--general-size-factor-px) * ${(Math.sin((index-1) * ((2 * Math.PI) / rollerTexts.length))) * 20})`,
            }}>{text}</div>
        })
        console.log(rollerElements)
        setTextRollerItems(rollerElements)
        

    }, [])


    return (
        <span className="text-roller-container">
           {...textRollerItems}
        </span>
    )
}   