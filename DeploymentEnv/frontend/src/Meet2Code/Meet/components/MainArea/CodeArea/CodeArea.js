
import React from 'react';
import { useState, useEffect } from 'react'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { MonacoBinding } from 'y-monaco'
import * as monaco from 'monaco-editor';
import serverEndpoint from '../../../../config';
import { useParams } from "react-router-dom";

import './code-area.css';
import Style from 'style-it';

const monacoThemeList = ["vs", "vs-dark", "hc-black"]
let editor


export default function CodeArea(props) {

    let [tabs, setTabs] = useState([
        {
          'theme' : 'vs',
          'language' : 'javascript',
          'question' : undefined
        },
        {
          'theme' : 'vs-dark',
          'language' : 'javascript',
          'question' : undefined
        }
    ]);
  
    let [tabLen, setTablen] = useState(4)
    let [currentTab, setCurrentTab] = useState(0)
    let [tag, setTag] = useState('2-sat')
    let [modalQuestions, setModalQuestions] = useState([])
    
    let roomId = useParams()['id']
    useEffect(()=>{
  
      let docEditor = document.getElementById("monaco-editor")
      docEditor.innerHTML = ""
  
      const ydocument = new Y.Doc()
      let endPt=""
  
      const provider = new WebsocketProvider('wss://demos.yjs.dev/', roomId + ":" + currentTab, ydocument)
      console.log(provider)
      const type = ydocument.getText('monaco')
  
      editor = monaco.editor.create(document.getElementById('monaco-editor' ), {
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
  
    },[props.roomId, currentTab, tabs, roomId])
  
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
        console.log(tabId,"Logging");
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
  
    let setQuestion = (question) => {
  
      let curTabs = [...tabs]
      curTabs[currentTab]['question'] = question
      setTabs(curTabs)
  
      console.log(question)
      props.setQuestDiv(question)
  
    }
    
  return Style.it(`
    .code-area{
      background-color: ${props.theme[1]};
    }

    .editorProperties{
        background-color : ${props.theme[0]}
    }

    .tabOptionDisplay{
        cursor : pointer;
    }
  `,
    <div className='code-area'>
        <div id="monaco-editor">
        </div>
    </div>
  )
}
