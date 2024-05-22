import { useEffect, useRef, useState } from "react"
import '../assets/styles/image-roller.css'
import { colorCycle } from '../assets/animations'

export default function ImageRoller({rollerImages}) {

    const [imageRollerItems, setImageRollerItems] = useState([])

    useEffect(() => {
        console.log(rollerImages)
        const rollerElements = rollerImages.map((image, index) => {
           return <img key={index} className="image-roller-item" src={image} style={{
                transform: `rotateX(${index * (360 / rollerImages.length)}deg) rotateZ(0deg) rotateY(0deg) translate3d(0, 0, calc(310 * var(--general-size-factor-px)))`,
            }}/>
        })

        setImageRollerItems(rollerElements)
        

    }, [])


    return (
        <div className="image-roller-container">
           {...imageRollerItems}

        </div>
    )
}   