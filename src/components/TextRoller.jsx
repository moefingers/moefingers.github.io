import { useEffect, useRef } from "react"
import '../assets/styles/text-roller.css'

export default function TextRoller() {

    const textRollerContainerElement = useRef(null)
    useEffect(() => {
        console.log(textRollerContainerElement.current)
        Object.values(textRollerContainerElement.current.children).forEach((element, index) => {
            element.style = `
            transform: translate3d(0, 0, 0) rotateX(${- 60 + index * 60}deg) rotateZ(0deg) rotateY(0deg);
            top: calc(var(--general-size-factor-px) * ${(index + 1) * 12});
            `
        })

    }, [])


    return (
        <span ref = {textRollerContainerElement} className="text-roller-container">
                <div className="text-roller-item">Software Engineer</div>
                <div className="text-roller-item">Frontend Developer</div>
                <div className="text-roller-item">Backend Developer</div>
                <div className="text-roller-item">Full Stack Developer</div>
        </span>
    )
}   