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
            const rotation = index * (360 / rollerTexts.length)
            if(rotation >= 90 || rotation <= 270){

            }
            return <div key={index} className="text-roller-item" style={{
                transform: `rotateX(${rotation}deg) rotateZ(0deg) rotateY(0deg) translate3d(0, 0, 25px)`,
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