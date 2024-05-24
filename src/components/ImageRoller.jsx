import { useEffect, useRef, useState } from "react"
import '../assets/styles/image-roller.css'

CSS.registerProperty({
    name: '--backing-offset',
    syntax: '<length>',
    initialValue: '0',
    inherits: false
})

export default function ImageRoller({rollerImages, scrollPosition, projectsScrollElement, backupImage}) {

    const [imageRollerItems, setImageRollerItems] = useState([])

    useEffect(() => {
        // console.log(rollerImages)

        const rollerElements = rollerImages.map((image, index) => {
            document.documentElement.style.setProperty(`--image-${index}`, "0deg")
            
            return (
                <div key={index} className="image-roller-item">
                    <img onClick={(event) => {scrollToIndex(index)}} src={image} onError={noImage} className="backing" style={{
                        transform: `
                        rotateX(${index * (-360 / rollerImages.length)}deg) 
                        rotateZ(calc(${index * (-360 / rollerImages.length)}deg + var(--partial-rotation) + var(--image-${index}))) 
                        rotateY(0deg) 
                        
                        translate3d(
                            0, 
                            0, 
                            calc(  (( ${((rollerImages.length / Math.PI) / 2) * 119.5}  )  * var(--general-size-factor-px)) -   calc(var(--backing-offset))        )
                            `,
                    }}/>
                    <img onClick={(event) => {scrollToIndex(index)}} src={image} onError={noImage} style={{
                        transform: `
                        rotateX(${index * (-360 / rollerImages.length)}deg) 
                        rotateZ(calc(${index * (-360 / rollerImages.length)}deg + var(--partial-rotation) + var(--image-${index}))) 
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

        function noImage(event){
            console.log(event.target.src)
            event.target.src = backupImage
            // add class to target
            event.target.classList.add("no-image")
        }

        setImageRollerItems(rollerElements)
        /* 360   -    7 / 360      to fix off by one */
        const partialRotation = (360 / rollerImages.length)
        const fullRotation = `${360 - partialRotation}deg`
        document.documentElement.style.setProperty('--full-rotation', fullRotation)
        document.documentElement.style.setProperty('--partial-rotation', partialRotation + "deg")
        // console.log(fullRotation)
        // console.log(partialRotation)

    }, [rollerImages])

    const ImageRollerElement = useRef(null)
    useEffect(() => {
        const decimalFromTop = scrollPosition / rollerImages.length
        document.documentElement.style.setProperty('--current-rotation-factor', decimalFromTop)
        // console.log(scrollPosition / rollerImages.length)

        for(let count = 0; count < rollerImages.length; count++) {
            // console.log(count * (360 / rollerImages.length))
            document.documentElement.style.setProperty(`--image-${count}`, `${decimalFromTop * 360}deg`)
        }
    }, [scrollPosition])


    return (
        <div ref={ImageRollerElement} className="image-roller-container">
           {...imageRollerItems}
            <div className={`roller-reminder ${scrollPosition != 0 ? "hidden" : ""}`}>click any of these</div>
        </div>
    )
}   