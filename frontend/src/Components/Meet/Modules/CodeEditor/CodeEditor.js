/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React from 'react';
// import AceEditor from "react-ace";
import { useState, useEffect } from 'react'

import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { MonacoBinding } from 'y-monaco'
import * as monaco from 'monaco-editor'
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route
} from 'react-router-dom'

// import "ace-builds/src-noconflict/mode-java";
// import "ace-builds/src-noconflict/mode-javascript";

// import "ace-builds/src-noconflict/theme-monokai";
// import "ace-builds/src-noconflict/theme-xcode";
// import "ace-builds/src-noconflict/theme-solarized_dark";
// import "ace-builds/src-noconflict/ext-language_tools"
// import io from 'socket.io-client'


const monacoThemeList = ["vs", "vs-dark", "hc-black"]

const CodeEditor=(props)=>{

  let [tabs, setTabs] = useState([

      {
        'theme' : 'vs-dark',
        'language' : 'javascript'
      },
      {
        'theme' : 'vs-dark',
        'language' : 'javascript'
      }
  ])

  let [tabLen, setTablen] = useState(4)
  let [currentTab, setCurrentTab] = useState(0)

  useEffect(()=>{

    let docEditor = document.getElementById("monaco-editor")
    docEditor.innerHTML = ""

    const ydocument = new Y.Doc()
    let endPt=""

    const provider = new WebsocketProvider('wss://demos.yjs.dev/', props.roomId + ":" + currentTab, ydocument)
    console.log(provider)
    const type = ydocument.getText('monaco')

    const editor = monaco.editor.create(document.getElementById('monaco-editor' ), {
      value: '', // MonacoBinding overwrites this value with the content of type
      language: tabs[currentTab]['language'],
      theme : tabs[currentTab]['theme'],
      quickSuggestions: {
        "other": true,
        "comments": true,
        "strings": true
    },
      parameterHints: {
          enabled: true
      },
      ordBasedSuggestions: true,
      suggestOnTriggerCharacters: true,
      acceptSuggestionOnEnter: "on",
      tabCompletion: "on",
      wordBasedSuggestions: true
    })


    // Bind Yjs to the editor model
    const monacoBinding = new MonacoBinding(type, editor.getModel(), new Set([editor]), provider.awareness)
    console.log(monacoBinding.doc, editor.getValue())

  },[props.roomId, currentTab, tabs])

  //Change the current tab to point to tabId
  let changeTab=(tabId)=>{
    setCurrentTab(tabId)
  }

  let closeTab=(tabId)=>{
    
      let curLen = tabLen, curList = [...tabs]
      curList.splice(curList.indexOf(tabId),1)

      if(curList.length === 0)
      {
        curList.push(curLen);
        setCurrentTab(curLen);
        setTablen(curLen+1)
      }
      setTabs(curList)
      if(tabId === currentTab)
      { 
        setCurrentTab(curList[0])
      }

  }

  let changeEditor=(language,theme)=>{

    let newObj = {}
    if(language !== undefined)
    {
      newObj = {
        'language' : language,
        'theme' : tabs[currentTab]['theme']
      }
    }

    else if(theme !== undefined)
    {
      newObj = {
        'language' : tabs[currentTab]['language'],
        'theme' : theme
      }
    }


    let tabsCopy = [...tabs]
    tabsCopy[currentTab] = newObj
    setTabs(tabsCopy)

  }

  return(
    <React.Fragment>
      <div className='container mt-2'>
        <div className='row' style={{width:"100%", height:"50px", backgroundColor:"#ffeeea"}}>
          <div style={{overflowX:"auto", whiteSpace:"nowrap", borderBottom:"1px solid black"}}>
            {
              tabs.map((tab, index)=>
              {
                let stl = {backgroundColor:"#ffeeea"} 
                if(tab === currentTab)
                {
                  stl = {backgroundColor:"yellow"}
                }
                return(
                  <div className='col-1 pl-3 pr-3' style={{display:"inline-block", cursor:"pointer", float:"none", color:"black", borderRight:"1px solid black"}} 
                  onClick={()=>{changeTab(index)}}>
                    <div className='row' style={stl}>
                      <div  className = "col-8">
                        <h>Tab {index}</h>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className='row container justify-content-between' style={{width:"100%", height:"30px", color:"black"}}>
              <div className='col-6' style={{textAlign:"left"}}>
                <div className='dropdown' >
                  <button class="btn btn-secondary dropdown-toggle" style={{maxWidth:"100%", maxHeight:"50%", height:"25px", fontSize:"15px"}} type="button" id="languageSelect" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Language
                  </button>
                  <div class="dropdown-menu" aria-labelledby="languageSelect">
                  <div className="dropdown-item" onClick={()=>changeEditor("javascript", undefined)}>Javascript</div>
                  <div className="dropdown-item" onClick={()=>changeEditor("java", undefined)}>Java</div>
                  <div className="dropdown-item" onClick={()=>changeEditor("c", undefined)}>C</div>
                </div>
              </div>
            </div>
            <div className='col-6' style={{textAlign:"right"}}>
              <div className='dropdown'>
                <button class="btn btn-secondary dropdown-toggle" type="button" id="themeSelect" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Theme
                </button>
                <div class="dropdown-menu" aria-labelledby="themeSelect">
                  <div className="dropdown-item" onClick={()=>changeEditor(undefined, "vs-dark")}>vs-dark</div>
                  <div className="dropdown-item" onClick={()=>changeEditor(undefined, "vs")}>vs</div>
                  <div className="dropdown-item" onClick={()=>changeEditor(undefined, "hc-black")}>hc-black</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="monaco-editor" className="row  " style={{width:"100%", height:"100%"}}>
        </div>
      </div>
    </React.Fragment>

  )

}

export default CodeEditor;