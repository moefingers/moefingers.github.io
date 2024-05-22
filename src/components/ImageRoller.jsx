import { useEffect, useRef, useState } from "react"
import '../assets/styles/image-roller.css'
import { colorCycle } from '../assets/animations'

export default function ImageRoller({rollerImages}) {

    const [imageRollerItems, setImageRollerItems] = useState([])

    useEffect(() => {
        console.log(rollerImages)
        const rollerElements = rollerImages.map((image, index) => {
           return <img key={index} className="image-roller-item" src={image} style={{
                transform: `
                rotateX(${index * (360 / rollerImages.length)}deg) 
                rotateZ(${index * (360 / rollerImages.length)}deg) 
                rotateY(0deg) 
                
                translate3d(
                    0, 
                    0, 
                    calc(${(rollerImages.length / Math.PI) / 2 * 120} * var(--general-size-factor-px)))`,
            }}/>
        })

        setImageRollerItems(rollerElements)
        /* 360   -    7 / 360      to fix off by one */
        const partialRotation = (360 / rollerImages.length)
        const fullRotation = `${360 - partialRotation}deg`
        document.documentElement.style.setProperty('--full-rotation', fullRotation)
        document.documentElement.style.setProperty('--partial-rotation', partialRotation + "deg")
        console.log(fullRotation)
        console.log(partialRotation)

    }, [])


    return (
        <div className="image-roller-container">
           {...imageRollerItems}

        </div>
    )
}   