import * as monaco from 'monaco-editor'
import axios from 'axios'
import { returnData } from '../CodeEditor/CodeEditor'

const CodeExecutor = ()=> {

    const createSubmisssion = (userInput, code) => {
        let bout=''
        const bcode = btoa(JSON.parse(code))
        console.log(bcode)
        const binp = btoa(userInput)
        // console.log(binp)
        const options = {
            method: 'POST',
            url: 'https://judge0-ce.p.rapidapi.com/submissions',
            params: {base64_encoded: 'true', fields: '*'},
            headers: {
              'content-type': 'application/json',
              'Content-Type': 'application/json',
              'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
              'X-RapidAPI-Key': 'f255e11643msh97d0b871770d1b6p1cd410jsn1666b3607192'
            },
          };
          options["data"] = {
              "language_id": 52, // C language
              "source_code": bcode,
              "stdin": binp
          }
          
          axios.request(options).then(function (response) {
            //   console.log(response.data);
            const subToken = response.data["token"]
            // console.log(subToken)
            const inoptions = {
                method: 'GET',
                url: 'https://judge0-ce.p.rapidapi.com/submissions/'+subToken,
                params: {base64_encoded: 'true', fields: '*'},
                headers: {
                  'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                  'X-RapidAPI-Key': 'f255e11643msh97d0b871770d1b6p1cd410jsn1666b3607192'
                }
              };
              
              axios.request(inoptions).then(function (response) {
                //   console.log(response.data);
                if(response.data["stdout"]==null)
                {
                    bout = response.data["compile_output"]
                }
                else
                {
                    bout = response.data["stdout"]
                }
                document.getElementById("code-output").value = atob(bout)
              }).catch(function (error) {
                  console.error(error);
              });

          }).catch(function (error) {
              console.error(error);
          });
    }

    const executeCode=()=>
    {
        const userInput = document.getElementById("user-input").value
        const code =  JSON.stringify(returnData())
        // const code = editor.getValue()
        // console.log(editor)
        
        // console.log(code)
        createSubmisssion(userInput, code)

    }

    return(
        <div className="code-executor">
            <div className="user-input">
                <label for="user-input">Input</label>
                <br></br>
                <textarea id="user-input" rows="4" cols="50" placeholder="Type your input here">
                </textarea>
            </div>
            <div className="compiler-output">
                <label for="code-output">Compiler Ouput</label>
                <br></br>
                <textarea id="code-output" rows="4" cols="50" readOnly>
                </textarea>
            </div>
            <div>
                <br></br>
                <br></br>
                <button style={{'background-color': "black", color: "white"}} onClick={executeCode}>Run</button>
            </div>
            

        </div>
    )
}

export default CodeExecutor