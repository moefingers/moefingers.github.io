import { useEffect, useRef, useState } from "react"
import '../assets/styles/text-roller.css'
import { colorCycle } from '../assets/animations'

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
                animation: "colorCycle 3.5s linear infinite",
                animationDelay: `${index * - (Math.random() * 3.5)}s`,
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