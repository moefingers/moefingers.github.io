import { useRef } from 'react'
import "../assets/styles/dev.css"

import "../assets/styles/post-single.css"

import SyntaxHighlighter from 'react-syntax-highlighter';
import { xt256 } from 'react-syntax-highlighter/dist/esm/styles/hljs';



export default function HTMLtoJSON() {

    const textareaElement = useRef()
    const HTMLArea = useRef()
    const dateArea = useRef()
    function parseHTMLRef(ref) {
        
        const content = {
            type: 'div',
            props: {
                className: 'post-content-container'
            },
            children: []
        }

        function readNode(node) {
            if(node.nodeType == Node.ELEMENT_NODE) {
                const attributes = {}
                for(const attribute of node.attributes) {
                    if(attribute.name != "style" ){
                      attributes[attribute.name] = attribute.value
                    }
                }
                if(attributes.overridetypeto){
                    delete attributes.contentstring
                    return {type: attributes.overridetypeto, props: {className: node.classList.value, ...attributes}, children: node.attributes.contentstring.value}
                }
                const children = Array.from(node.childNodes).map(readNode)
                return {type: node.tagName.toLowerCase(), props: {className: node.classList.value, ...attributes}, children: children}
            } else if (node.nodeType == Node.TEXT_NODE) {
                return node.data
            }
        }
        function readChildren(element) {
            console.log(element.children)
            
            if(element.children.length == 0){
                console.log(`${element.tagName} has no children`)
                const attributes = {}
                if(element.attributes.length != 0){
                    element.attributes.forEach(attribute => {
                        attributes[attribute.name] = attribute.value
                    })
                }// for each attribute - attribute.name: attribute.value
                
                return {type: element.tagName.toLowerCase(), props: {className: element.classList.value, ...attributes}, children: element.innerText}
            } else {
                console.log(`${element} has children`)
                let childNodes = []
                for (const childNode of element.childNodes) {
                    if(childNode.nodeType == 3){
                        childNodes.push({type: 'text', props: {}, children: childNode.data})
                    } else {
                        childNodes.push(readChildren(childNode))
                    }
                }
                return {type: element.tagName.toLowerCase(), props: {className: element.classList.value}, children: childNodes}
            }
        }
        console.log(ref)
        const result = readNode(ref.current)
        console.log(result)
        textareaElement.current.value = JSON.stringify(result, null, 3)

    }
    function logDate(){
        const now = new Date();
        const ISOtime = now.toISOString();
        console.log(ISOtime)
        
        dateArea.current.value = ISOtime


        const dateMStest = Date.now("2024-05-26T20:29:30.060Z").toString();;
        const ms = dateMStest
        console.log(ms)
    }

    /*
    <p className='post editor'>Editor: <a editorlinktag="true" >XXXXXXXXXXXXXXXXX</a></p>
    <a href="#/Posts/getting-all-commits#intro" target="_blank">inter-site-link in new tab</a>
    <SyntaxHighlighter language='html' style={xt256} className='code-container' contentstring={stringofcontents} overridetypeto={"SyntaxHighlighter"} syntaxhighlighterstyle={"xt256"}>
        {stringofcontents}
    </SyntaxHighlighter>
    */

    return (
        <div className="dev-page-container post-single-page-container">
            <h1>HTMLtoJSON (for react posts)</h1>
            <button className='dev' onClick={() => {logDate()}}><em className='quaternary'>console.log</em>(<em>ISOtime</em>) and print to page</button>
            <input type="text" readOnly ref={dateArea}/>
            <button className='dev' onClick={() => {parseHTMLRef(HTMLArea)}}><em className='quaternary'>console.log</em> <em>div.html-area</em> as <em className='tertiary'>JSON</em> and print to page</button> <br />
            <textarea readOnly ref={textareaElement}></textarea> <br />

            
            <div className="html-area" ref={HTMLArea}>

            </div>

        </div>
    )
}

