import { useEffect, useRef, useState } from "react"
import '../assets/styles/image-roller.css'

export default function ImageRoller({rollerImages, scrollPosition, projectsScrollElement}) {

    const [imageRollerItems, setImageRollerItems] = useState([])

    useEffect(() => {
        console.log(rollerImages)
        const rollerElements = rollerImages.map((image, index) => {
           return (
            <div key={index} className="image-roller-item">
                <img onClick={(event) => {scrollToIndex(index)}} src={image} className="backing" style={{
                    transform: `
                    rotateX(${index * (-360 / rollerImages.length)}deg) 
                    rotateZ(${index * (-360 / rollerImages.length)}deg) 
                    rotateY(0deg) 
                    
                    translate3d(
                        0, 
                        0, 
                        calc(${((rollerImages.length / Math.PI) / 2) * 110} * var(--general-size-factor-px)))
                        `,
                }}/>
                <img onClick={(event) => {scrollToIndex(index)}} src={image} style={{
                    transform: `
                    rotateX(${index * (-360 / rollerImages.length)}deg) 
                    rotateZ(${index * (-360 / rollerImages.length)}deg) 
                    rotateY(0deg) 
                    
                    translate3d(
                        0, 
                        0, 
                        calc(${((rollerImages.length / Math.PI) / 2) * 120} * var(--general-size-factor-px)))
                        `,
                }}/>
                
            </div>
            
            )
        })

        function scrollToIndex(index) {
            const eachHeight = (document.querySelector("section").scrollHeight)
            projectsScrollElement.scrollTop = eachHeight * index
        }

        setImageRollerItems(rollerElements)
        /* 360   -    7 / 360      to fix off by one */
        const partialRotation = (360 / rollerImages.length)
        const fullRotation = `${360 - partialRotation}deg`
        document.documentElement.style.setProperty('--full-rotation', fullRotation)
        document.documentElement.style.setProperty('--partial-rotation', partialRotation + "deg")
        // console.log(fullRotation)
        // console.log(partialRotation)

    }, [])

    const ImageRollerElement = useRef(null)
    useEffect(() => {

        document.documentElement.style.setProperty('--current-rotation-factor', (scrollPosition / rollerImages.length))
        // console.log(scrollPosition / rollerImages.length)
    }, [scrollPosition])


    return (
        <div ref={ImageRollerElement} className="image-roller-container">
           {...imageRollerItems}

        </div>
    )
}   