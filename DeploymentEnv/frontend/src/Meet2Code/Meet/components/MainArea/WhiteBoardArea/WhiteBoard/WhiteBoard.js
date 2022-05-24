import React, { useState } from 'react';
import Board from '../Board/Board';
import './white-board.css';
 
const WhiteBoard = (props) => {
    const [brushColor,setBrushColor] = useState('#000000');
    const [color,setColor] = useState('#000000');
    const [size,setSize] = useState(5);
    return (  
        <div className='outer-container'>
            <div className='tools-section'>
                <div className='color-picker-container'>
                    Select color : &nbsp;
                    <input type='color' id='color-box' onChange={(e)=>{setColor(e.target.value);setBrushColor(color);}}/> 
                </div>
                <div className='brush-size-container'>
                    Select size : &nbsp;
                    <select value={size} onChange={(e)=>{setSize(e.target.value)}}>
                        <option>5</option>
                        <option>10</option>  
                        <option>15</option>  
                        <option>20</option>  
                        <option>25</option>  
                        <option>30</option>      
                    </select> 
                </div>
                <div>
                    <button id='erase' onClick={()=>{setBrushColor(color);setColor('#FFFFFF')}}><img src='/icons/eraser.png' alt="erase" height="40" width="40" /></button>
                </div>
                <div>
                    <button onClick={()=>setColor(brushColor)}><img src='/icons/paint-brush.png' alt="brush" height="35" width="35" /></button>
                </div>
            </div>
            <div className='board-container'>
                <Board {...props}/>
            </div>
        </div>
    );
}
 
export default WhiteBoard;