import React from 'react';
import './code-editor.css';
import { useState, useEffect } from 'react'

import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { MonacoBinding } from 'y-monaco'
import * as monaco from 'monaco-editor'
import serverEndpoint from '../../../../../config';

const monacoThemeList = ["vs", "vs-dark", "hc-black"]
let editor;

export default function CodeEditor(props) {
    let [codeTabs, setCodeTabs] = useState([

        {
          'theme' : 'vs-dark',
          'language' : 'javascript',
          'question' : undefined
        },
        {
          'theme' : 'vs-dark',
          'language' : 'javascript',
          'question' : undefined
        }
    ]);
    let [tabLen, setTablen] = useState(4);
    let [currentTab, setCurrentTab] = useState(0);
    let [tag, setTag] = useState('2-sat');
    let [modalQuestions, setModalQuestions] = useState([]);

    useEffect(()=>{

        let docEditor = document.getElementById("monaco-editor")
        
        if(!docEditor) return;
        docEditor.innerHTML = ""
    
        const ydocument = new Y.Doc()
        let endPt=""
    
        const provider = new WebsocketProvider('wss://demos.yjs.dev/', props.roomId + ":" + currentTab, ydocument)
        console.log(provider)
        const type = ydocument.getText('monaco')
    
        editor = monaco.editor.create(document.getElementById('monaco-editor' ), {
          value: '', // MonacoBinding overwrites this value with the content of type
          language: codeTabs[currentTab]['language'],
          theme : codeTabs[currentTab]['theme'],
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
    
      },[props.roomId, currentTab, codeTabs])
      useEffect(()=>{

        let api_fetch = async () => {
  
          let questions = await fetch(serverEndpoint + '/codeforces/questions?tags=' + tag);
          questions = await questions.json()
          setModalQuestions(questions['questions']['result']['problems']);
        }
  
        api_fetch()
  
    },[tag]);
  
    //Change the current tab to point to tabId
    let changeTab=(tabId)=>{
      setCurrentTab(tabId)
    }
  
    let closeTab=(tabId)=>{
  
        let curLen = tabLen, curList = [...codeTabs]
        curList.splice(curList.indexOf(tabId),1)
  
        if(curList.length === 0)
        {
          curList.push(curLen);
          setCurrentTab(curLen);
          setTablen(curLen+1)
        }
        setCodeTabs(curList)
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
          'theme' : codeTabs[currentTab]['theme']
        }
      }
  
      else if(theme !== undefined)
      {
        newObj = {
          'language' : codeTabs[currentTab]['language'],
          'theme' : theme
        }
      }
  
      let tabsCopy = [...codeTabs]
      tabsCopy[currentTab] = newObj
      setCodeTabs(tabsCopy)
    }
  
    let setQuestion = (question) => {
  
      let curTabs = [...codeTabs]
      curTabs[currentTab]['question'] = question
      setCodeTabs(curTabs)
  
      console.log(question)
      props.setQuestDiv(question)
  
    }
    return (
        <div className='code-editor-container'>
            <div className='row' style={{width:"100%", height:"50px", backgroundColor:"#ffeeea"}}>
            <div style={{overflowX:"auto", whiteSpace:"nowrap", borderBottom:"1px solid black"}}>
                {
                codeTabs.map((tab, index)=>
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
                <div className='col-4' style={{textAlign:"left"}}>
                    <div className='dropdown' >
                    <button className="btn btn-secondary dropdown-toggle" style={{maxWidth:"100%", maxHeight:"50%", height:"25px", fontSize:"15px"}} type="button" id="languageSelect" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Language
                    </button>
                    <div className="dropdown-menu" aria-labelledby="languageSelect">
                        <div className="dropdown-item" onClick={()=>changeEditor("javascript", undefined)}>Javascript</div>
                        <div className="dropdown-item" onClick={()=>changeEditor("java", undefined)}>Java</div>
                        <div className="dropdown-item" onClick={()=>changeEditor("c", undefined)}>C</div>
                    </div>
                    </div>
                </div>

                <div className='col-4' style={{textAlign:"center"}}>
                    <button className='btn-primary' data-toggle="modal" data-target="#exampleModal">
                        Choose a question
                    </button>
                    <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                            Select a question
                            </div>
                            <div className="modal-body">
                            <div className='dropdown'>
                                <button className="btn btn-secondary dropdown-toggle" type="button" id="cat-select" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Category
                                </button>
                                <div className="dropdown-menu" aria-labelledby="cat-select">
                                <div className="dropdown-item" onClick={ () => setTag('2-sat')}>2-sat</div>
                                <div className="dropdown-item" onClick={ () => setTag('fft')}>fft</div>
                                <div className="dropdown-item" onClick={ () => setTag('implementation')}>implementation</div>
                                </div>
                            </div>

                            <div className='mt-2'>
                                <ul>
                                { modalQuestions.map(question => {
                                    return <li style={{ "cursor" : "pointer" }} onClick = { () => {setQuestion(question) } } >
                                            { question['name'] } : { question['rating']}
                                        </li>

                                }) }
                                </ul>
                            </div>
                            <div>
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                <div className='col-4' style={{textAlign:"right"}}>
                    <div className='dropdown'>
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="themeSelect" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Theme
                    </button>
                    <div className="dropdown-menu" aria-labelledby="themeSelect">
                        <div className="dropdown-item" onClick={()=>changeEditor(undefined, "vs-dark")}>vs-dark</div>
                        <div className="dropdown-item" onClick={()=>changeEditor(undefined, "vs")}>vs</div>
                        <div className="dropdown-item" onClick={()=>changeEditor(undefined, "hc-black")}>hc-black</div>
                    </div>
                    </div>
                </div>

            </div>
            </div>
            <div id="monaco-editor" className="monaco-editor">
            </div>
        </div>
    )
}
