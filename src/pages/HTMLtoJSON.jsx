import { useRef } from 'react'

export default function HTMLtoJSON() {

    const textareaElement = useRef()
    const htmlArea = useRef()
    function parseHTML(html) {
        console.log(htmlArea.current)
        htmlArea.current
    }

    return (
        <div>
            <h1>HTMLtoJSON</h1>
            <button onClick={() => {parseHTML()}}>Press to log HTML as json to console and textarea below</button> <br />
            <textarea readOnly style={{transition: 0}} ref={textareaElement}></textarea>

            
            <div ref={htmlArea}>
                <h1 className='$$$title$$$'>Single Page Application Portfolio Including Projects and Posts</h1>
            </div>
        </div>
    )
}

/* 
"connectedToProject": "moefingers.github.io",
            "path": "portfolio",

            "title": "Single Page Application Portfolio Including Projects and Posts",
            "author": "Mohammad Zuiter",
            "createdAt": "2024-05-26T01:00:00Z",
            "updatedAt": "2024-05-26T01:11:11Z",
            "reactElements": [
                {
                    "type": "h1",
                    "props": {
                        "className": "post-title"
                    },
                    "children": "$$$title$$$"
                }
            ]
*/