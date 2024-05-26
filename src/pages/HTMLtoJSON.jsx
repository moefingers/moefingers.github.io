import { useRef } from 'react'
import "../assets/styles/dev.css"
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

    return (
        <div className="dev-page-container">
            <h1>HTMLtoJSON (for react posts)</h1>
            <button className='dev' onClick={() => {logDate()}}>log date and print to box</button>
            <input type="text" readOnly ref={dateArea}/>
            <button className='dev' onClick={() => {parseHTMLRef(HTMLArea)}}>Press to log <em>div.html-area</em> as json to console and textarea below</button> <br />
            <textarea readOnly ref={textareaElement}></textarea> <br />

            
            <div className="html-area" ref={HTMLArea}>

                
                <section className='header'>
                    <h1 className='post title'>$$$title$$$</h1>
                    <p className="post author">By: $$$author$$$</p>
                    <p className="post date created">Posted: $$$createdAt$$$</p>
                    <p className="post date updated">Last Edited: $$$updatedAt$$$</p>
                </section>
                <section className='index'>
                    <h2>Index</h2>
                    <a href="#/Posts/writing-react-posts#intro">intro</a>
                    <a href="#/Posts/writing-react-posts#the-html">the html</a>
                    <a href="#/Posts/writing-react-posts#the-function">the function</a>
                    <a href="#/Posts/writing-react-posts#the-output">the output</a>
                    <a href="#/Posts/writing-react-posts#interpretation">json intrepretation</a>
                    <a href="#/Posts/writing-react-posts#afterword">afterword and link to try it</a>
                </section>
                <section id = 'intro'>
                    <h2>Intro</h2>
                    <p>So essentially I wrote an entire program that would recursively interpet children of a given HTML element and spit them all out in JSON.</p>
                </section>
                <section id = '/Posts/writing-react-posts#the-html'>
                    <h2>The HTML (input)</h2>
                    <p>This is an example of the type of HTML I wanted to turn into JSON that could be later interpreted by <em>React.createElement</em>.</p>
                    <p>You may notice that there are tokens like <em>$$$</em><em>token$$$</em>. These will be replaced later by other information that I'd provide for each post in the post database.</p>
                    <SyntaxHighlighter language='html' style={xt256} className='code-container' contentstring={codeStringInputExample} overridetypeto={"SyntaxHighlighter"} syntaxhighlighterstyle={"xt256"}>
                        {codeStringInputExample}
                    </SyntaxHighlighter>
                </section>
                <section id ="/Posts/writing-react-posts#the-function">
                    <h2>The Function</h2>
                    <p>So here's the function which will recursively pull out contents of children and their children.</p>
                    <p>The expected input is an element, I got that from declaring a constant that invokes <em>React.useRef</em>... <em>const postElementRef = useRef()</em> and then I fed <em>postElementRef.current</em> into this function.</p>
                    <p>Funny story about this, this function used to read children instead of childNodes. Reading childNodes is important to preserve text siblings, like <em>{`<div>textsibling<a>nestedelement</a></div>`}</em></p>
                    <SyntaxHighlighter language='javascript' style={xt256} className='code-container' contentstring={codeReadNodesFunction} overridetypeto={"SyntaxHighlighter"} syntaxhighlighterstyle={"xt256"}>
                        {codeReadNodesFunction}
                    </SyntaxHighlighter>
                </section>
                <section id="/Posts/writing-react-posts#the-output">
                    <h2>The JSON (output)</h2>
                    <p>Here's the output of the function given the previous input.</p>
                    <SyntaxHighlighter language='javascript' style={xt256} className='code-container' contentstring={codeStringOutputExample} overridetypeto={"SyntaxHighlighter"} syntaxhighlighterstyle={"xt256"}>
                        {codeStringOutputExample}
                    </SyntaxHighlighter>
                </section>
                <section id="/Posts/writing-react-posts#interpretation">
                    <h2>Interpretation of the JSON by React</h2>
                    <p>So now that we have a JSON, we could hypothetically pass it into <em>React.createElement</em> - but it's not that easy.</p>
                    <p>React won't know to interpret nested children as new <em>React</em> elements that ought to be passed into another invocation <em>React.createElement</em>.</p>
                    <p>Can you see where this is going? <em>Recursion</em>. </p>
                    <p>Here's what we came up with, assuming we made a state - <em>const [reactPage, setReactPage] = useState(null)</em> and rendered it later in the <em>JSX</em> as <em>{`{reactPage}`}</em>.</p>
                    <SyntaxHighlighter language='javascript' style={xt256} className='code-container' contentstring={codeStringReact} overridetypeto={"SyntaxHighlighter"} syntaxhighlighterstyle={"xt256"}>
                        {codeStringReact}
                    </SyntaxHighlighter>
                    <p>You'll note that I'm using parseISO from <em>date-fns</em> to convert ISO strings into dates if possible. </p>
                    <p>Then, if it is possible, my own function <em>toUserTime</em> to convert those dates into user-friendly strings.</p>
                    <p>With that out of the way, I can mention what you probably see already, which is a nice RegExp to collect the string between the two <em>$$$</em> and replace the whole "token".</p>
                    <p>Then, that string is used as a key in the <em>post</em> object to get things like the title, or the dates.</p>
                </section>
                <section id="/Posts/writing-react-posts#afterword">
                    <h2>Afterword</h2>
                    <p>Is it overengineered? Probably. Wanna use the function? Try visiting <a href="/#/dev" target="_blank">/#/dev</a> on this site.</p>
                    <p>Wanna see a live example of all that in action? You just did. 🐇</p>
                </section>

            </div> 
            

        </div>
    )
}

const codeString1 =`function readChildren(element) {
    console.log(element.children)
    
    if(element.children.length == 0){
        console.log(\`\${element.tagName} has no children\`)
        return {type: element.tagName.toLowerCase(), props: {className: element.classList.value}, children: element.innerText}
    } else {
        console.log(\`\${element} has children\`)
        let children = []
        for (const child of element.children) {
            children.push(readChildren(child))
        }
        return {type: element.tagName.toLowerCase(), props: {className: element.classList.value}, children: children}
    }
}`
const codeReadNodesFunction=`function readNode(node) {
    if(node.nodeType == Node.ELEMENT_NODE) {
        const attributes = {}
        for(const attribute of node.attributes) {
            if(attribute.name != "style" ){
              attributes[attribute.name] = attribute.value
            }
        }
        if(attributes.overridetypeto){
            delete attributes.contentstring
            return {
                type: attributes.overridetypeto, 
                props: {
                    className: node.classList.value, 
                    ...attributes
                }, 
                children: node.attributes.contentstring.value
            }
        }
        const children = Array.from(node.childNodes).map(readNode)
        return {
            type: node.tagName.toLowerCase(), 
            props: {
                className: node.classList.value,
                 ...attributes
                }, 
                children: children
            }
    } else if (node.nodeType == Node.TEXT_NODE) {
        return node.data
    }
}`

const codeStringInputExample = `<div ref={postElementRef} className='post-content-container'>
    <section className='header'>
        <h1 className='post title'>$$$title$$$</h1>
        <p className="post author">By: $$$author$$$</p>
        <p className="post date created">Posted: $$$createdAt$$$</p>
        <p className="post date updated">Last Edited: $$$updatedAt$$$</p>
    </section>
    <div className='container'>
        <div className='child'>hi</div>
        <div className='child'>hey</div>
        <div className='child'>hello</div>
        <div className='child-with-children'>
            <div className='nested-child'>hola</div>
            <div className='nested-child'>hehe</div>
            <div className='nested-child'>omg stop</div>
        </div>
    </div>
</div>`

const codeStringOutputExample = `{
    "type": "div",
    "props": {
       "className": "post-content-container"
    },
    "children": [
       {
          "type": "section",
          "props": {
             "className": "header"
          },
          "children": [
             {
                "type": "h1",
                "props": {
                   "className": "post title"
                },
                "children": "$$$title$$$"
             },
             {
                "type": "p",
                "props": {
                   "className": "post author"
                },
                "children": "By: $$$author$$$"
             },
             {
                "type": "p",
                "props": {
                   "className": "post date created"
                },
                "children": "Posted: $$$createdAt$$$"
             },
             {
                "type": "p",
                "props": {
                   "className": "post date updated"
                },
                "children": "Last Edited: $$$updatedAt$$$"
             }
          ]
       },
       {
          "type": "div",
          "props": {
             "className": "container"
          },
          "children": [
             {
                "type": "div",
                "props": {
                   "className": "child"
                },
                "children": "hi"
             },
             {
                "type": "div",
                "props": {
                   "className": "child"
                },
                "children": "hey"
             },
             {
                "type": "div",
                "props": {
                   "className": "child"
                },
                "children": "hello"
             },
             {
                "type": "div",
                "props": {
                   "className": "child-with-children"
                },
                "children": [
                   {
                      "type": "div",
                      "props": {
                         "className": "nested-child"
                      },
                      "children": "hola"
                   },
                   {
                      "type": "div",
                      "props": {
                         "className": "nested-child"
                      },
                      "children": "hehe"
                   },
                   {
                      "type": "div",
                      "props": {
                         "className": "nested-child"
                      },
                      "children": "omg stop"
                   }
                ]
             }
          ]
       }
    ]
 }`

 const codeStringReact = `function createReactElement(reactElementContent) {
    const { type, props, children } = reactElementContent;
    if(props.class) { delete props.class }
    if(type == "SyntaxHighlighter"){
        return <SyntaxHighlighter language="javascript" style={xt256}>{children}</SyntaxHighlighter>
    }

    // If children is a string, wrap it in an array
    const childrenArray = Array.isArray(children) ? children : [children];

    const elementChildren = childrenArray.map((child) => {
        // If child is an object, recursively create the React element
        if (typeof child === 'object') {
            return createReactElement(child);
        }
        // If child is a string, create a text element
        if (child.includes("$$$")){
            function replaceThreeDollarToken(fullString, postFromJSON) {
                return fullString.replace(/\${3}([^$]+)\${3}/g, (match, group) => {
                    try {
                        if (parseISO(postFromJSON[group])) {
                            return toUserTime(postFromJSON[group]);
                        }
                    } catch (error) {
                        console.log(error)
                    }
                    return postFromJSON[group];
                });
            }

            child = replaceThreeDollarToken(child, postFromJSON)
        }
        return child;
    });

    const element = createElement(type, props, ...elementChildren);
    return element;
}

setReactPage(createReactElement(postFromJSON.reactElementContent))`