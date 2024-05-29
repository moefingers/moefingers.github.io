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

    return (
        <div className="dev-page-container post-single-page-container">
            <h1>HTMLtoJSON (for react posts)</h1>
            <button className='dev' onClick={() => {logDate()}}>log date and print to box</button>
            <input type="text" readOnly ref={dateArea}/>
            <button className='dev' onClick={() => {parseHTMLRef(HTMLArea)}}>Press to log <em>div.html-area</em> as json to console and textarea below</button> <br />
            <textarea readOnly ref={textareaElement}></textarea> <br />

            
            <div className="html-area" ref={HTMLArea}>

                
                <section className='header'>
                    <h1 className='post title'>$$$title$$$</h1>
                    <p className="post author">By: $$$author$$$</p>
                    <p className='post editor'>Editor: <a editorlinktag="true" >editorlinktag="true"</a></p>
                    <p className="post date created">Posted: $$$createdAt$$$</p>
                    <p className="post date updated">Last Edited: $$$updatedAt$$$</p>
                </section>
                <section className='index'>
                    <h2>Index</h2>
                    <a href="#/Posts/getting-all-commits#intro">Introduction</a>
                    <a href="#/Posts/getting-all-commits#the-plan">The Plan</a>
                    <a href="#/Posts/getting-all-commits#documentation">Reading The Documentation</a>
                    <a href="#/Posts/getting-all-commits#the-initial-request">The Initial Request</a>
                    <a href="#/Posts/getting-all-commits#follow-up-request">The Follow-Up Request</a>
                    <a href="#/Posts/getting-all-commits#the-output">Seeing The Output</a>
                    <a href="#/Posts/getting-all-commits#afterword">Afterword, GitHub Link</a>
                </section>
                <section id = '/Posts/getting-all-commits#intro'>
                    <h2>Intro</h2>
                    <p>I was applying for a job that highlighted the ability to use GitHub or other version control systems, as well as the ability to use APIs.</p>
                    <p>I've used GitHub, and I've had recent experience with their API. So I figured why not pair the two and slap another thing onto my resume.</p>
                </section>
                <section id = '/Posts/getting-all-commits#the-plan'>
                    <h2>The Plan</h2>
                    <p>From the logic I wrote in my <a href="/#/Projects" target="_blank">Projects</a> section, I knew there was a particular url from the API to get all the commits for a particular repository.</p>
                    <p>So the plan was, to get all the repositories for a user, then get all the commits for each repository, and finally add them all up.</p>
                </section>

                <section id = '/Posts/getting-all-commits#documentation'>
                    <h2>Reading The Documentation</h2>
                    <p>Let's look at the documentation together to find out how to get the repositories for a given user. <a href="https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-a-user" target="_blank">GitHub Docs REST API (list repos for a user)</a></p>
                    
                    {/* I would recommend explaining the below p in more detail. What is it exactly that you need to do? Are the readers supposed to already know this? What is the next page information? */}
                    <p>Looking at the request example <em>{`/users/{username}/repos`}</em> we can see exactly how we need to format our request <em>url</em>. We can also see <a href="https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api?apiVersion=2022-11-28#using-link-headers" target="_blank">elsewhere</a> in the documentation that there is next page information that will be in the response <em>Link</em> header.</p>
                    <p>In the request url parameters, we can include things like <em>per_page=100</em> to reduce the number of overall requests that we make.</p>
                    <p>Due to rate limits, it is wisest to use a <a href="https://docs.github.com/en/rest/authentication/authenticating-to-the-rest-api?apiVersion=2022-11-28#authenticating-with-a-personal-access-token" target="_blank">fine-grained personal access token</a> since we'll be repeatedly hitting the endpoint.</p>
                    <p>Also, it's worth noting that the <a href="https://docs.github.com/en/rest/using-the-rest-api/getting-started-with-the-rest-api?apiVersion=2022-11-28#accept" target="_blank">documentation</a> for the <em>Accept</em> header states we need to include <em>application/vnd.github+json</em> in it.</p>
                </section>

                <section id="/Posts/getting-all-commits#the-initial-request">
                    <h2>The Initial Request</h2>
                    <p>With what we've learned, the first request to get all the repositories for a given user is as follows, you'll see I've incorporated use of a local <em>.env</em> to protect my token.</p>
                    <em>https://api.github.com/users/MoeFingers/repos?per_page=100&page=1</em>
                    <SyntaxHighlighter language='html' style={xt256} className='code-container' contentstring={initialRequestString1} overridetypeto={"SyntaxHighlighter"} syntaxhighlighterstyle={"xt256"}>
                        {initialRequestString1}
                    </SyntaxHighlighter>
                    <p>Since all the results fit on one page, there is no information in the <em>Link</em> header.</p>
                    <p>If we reduce the number of results per page for testing purposes, we can see the <em>Link</em> header is now populated.</p>
                    <p>Knowing this, we can plan to conditionally fetch the next page of results until we're at the last page, where there will be no information in the <em>Link</em> header.</p>
                    <p>For now, what's important is that we can see each result has an api <em>url</em> key on which we can affix <em>/commits?per_page=100&page=1</em> to get the commits for that repository.</p>
                </section>

                <section id = '/Posts/getting-all-commits#follow-up-request'>
                    <h2>The Follow-Up Request</h2>
                    <p>As stated in the previous section, each result has a <em>url</em> key on which we can affix <em>/commits?per_page=100&page=1</em> to get the commits for that repository.</p>
                    
                    {/* I would add more emphasis on the importance/point of this step in the process. I think it could be explained in more detail. */}
                    <p>We'll use something like this as our address to get: <em>`${`{url}`}/commits?per_page=100&page=${`{page}`}`</em></p>
                    <p>You can see in the previous code for our intial request, it follows up by an invocation of <em>fetchCommits</em> with each repository <em>url</em> as an argument, and then getting the <em>length</em> of each return and adding it to a previously declared <em>totalLength</em>.</p>
                    <p>Let's look at that function.</p>
                    <SyntaxHighlighter language='html' style={xt256} className='code-container' contentstring={commitsRequestString1} overridetypeto={"SyntaxHighlighter"} syntaxhighlighterstyle={"xt256"}>
                        {commitsRequestString1}
                    </SyntaxHighlighter>
                    <p>You'll notice the logic for pagination is pretty similar to what we had earlier. This probably isn't very DRY (we're repeating the logic), but that doesn't really matter to me since the entire application is probably less than a hundred lines, and I want to be able to follow the difference in requests.</p>
                </section>

                <section id='/Posts/getting-all-commits#the-output'>
                    <h2>The Output</h2>
                    <p>Now, when we run the application, we'll get the following output.</p>
                    <code>{outputString1}</code>
                </section>
                
                <section id = '/Posts/getting-all-commits#afterword'>
                    <h2>Afterword</h2>
                    <p>Now we know at this particular moment I had 875 commits, and <a href="https://github.com/MoeFingers/how-many-commits-do-i-have" target="_blank">here</a>'s the link to the repository if you want to try it yourself. Don't hesitate to <a href="/#/Contact" target="_blank">contact</a> me if you have any questions.</p>
                </section>
            </div> 
            

        </div>
    )
}


const initialRequestString1 = `async function fetchRepos() {
    let page = 1;
  
    async function fetchPage(page) {
      return fetch(\`https://api.github.com/users/\${process.env.USER}/repos?per_page=100&page=\${page}\`, {
          method: "GET",
          headers: {
            "Authorization": \`token \${process.env.GITHUB_TOKEN}\`,
            "Content-Type": "application/vnd.github+json",
          },
        })
    }
  
    let data = [];
    let initialResponse = await fetchPage(page);
    let responseData = await initialResponse.json();
    data.push(...responseData);
  
    while(initialResponse.headers.get('Link') && initialResponse.headers.get('Link').includes('rel="next"')){
      page++;
      initialResponse = await fetchPage(page);
      responseData = await initialResponse.json();
      data.push(...responseData);
    }
  
    console.log("how many repos: " + data.length);
    let totalLength = 0;
    data.forEach(async (repo, index) => {
      let commits = await fetchCommits(repo.url);
      totalLength += commits.length;
      console.log("total: " + totalLength)
    });
  }`


const commitsRequestString1 =`async function fetchCommits(url) {
    let page = 1;
    async function fetchPage(page) {
      return fetch(\`\${url}/commits?per_page=100&page=\${page}\`, {
          method: "GET",
          headers: {
            "Authorization": \`token \${process.env.GITHUB_TOKEN}\`,
            "Content-Type": "application/vnd.github+json",
          },
        })
    }
  
    let data = [];
    let initialResponse = await fetchPage(page);
    let responseData = await initialResponse.json();
    data.push(...responseData);
  
    while(initialResponse.headers.get('Link') && initialResponse.headers.get('Link').includes('rel="next"')){
      page++;
      initialResponse = await fetchPage(page);
      responseData = await initialResponse.json();
      data.push(...responseData);
    }
  
    console.log(url, data.length);
  
    return data
  }`


const outputString1 = `how many repos: 60
https://api.github.com/repos/moefingers/5.5.5-activity-array-automotive 12
total: 12

{...}
  
https://api.github.com/repos/moefingers/UNLV-react-art-gallery 6
total: 762
https://api.github.com/repos/moefingers/moefingers.github.io 113
total: 875`