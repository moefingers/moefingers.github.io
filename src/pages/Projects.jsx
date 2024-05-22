import { useEffect, useState } from 'react'

import { projects } from "../assets/projects.json"

import ImageRoller from "../components/ImageRoller"

import '../assets/styles/projects.css'

const fullImageBlobImport = Object.values(import.meta.glob("@assets/images/*/*.{png,jpg,jpeg,PNG,JPEG,webp,WEBP}", { eager: true, query: '?url', import: 'default' }))
const images = {}
projects.forEach((project) => {
    images[project.imagesFolder] = fullImageBlobImport.map((image) => {
        if(image.includes(project.imagesFolder)){
            return image
        }else{
            return "https://placekitten.com/g/300/300"
        }
    })
})
/* expected:
{
    "v2-stopwatch": [
        "/src/assets/images/v2-stopwatch/0.png"
    ],
    "portfolio": []
}
*/

export default function Projects() {
    const [projectSectionElements, setProjectSectionElements] = useState([])

    useEffect(() => {
        const elements = projects.map((project, index) => {
            if(images[project.imagesFolder][0].length == 0 ){

            }
            return (
                <section className="project-section" key={index}>
                    <h2>{project.name}</h2>

                    <p>{project.description}</p>

                    <p>{project.coolest}</p>

                    <p>{project.hottest}</p>

                    <p>{project.tags}</p>

                    <img src={images[project.imagesFolder][0]} alt="" />
                </section>
            )
        })

        setProjectSectionElements(elements)
    }, [])

    return (
        <div className="projects-page-container">
                {...projectSectionElements}
            <ImageRoller rollerImages={Object.values(images).map((imageSet) => imageSet[0])}/>
        </div>
    )
}