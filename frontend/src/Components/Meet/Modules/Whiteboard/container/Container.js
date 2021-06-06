import React, { useState } from 'react';
import Board from '../board/Board';
import './container.css';
import eraser from '../../../../../Images/eraser.png';
import brush from '../../../../../Images/paint-brush.png';
 
const Container = (props) => {
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
                    <button id='erase' onClick={()=>{setBrushColor(color);setColor('#FFFFFF')}}><img src={eraser} alt="erase" height="40" width="40" /></button>
                </div>
                <div>
                    <button onClick={()=>setColor(brushColor)}><img src={brush} alt="brush" height="35" width="35" /></button>
                </div>
            </div>
            <div className='board-container'>
                <Board clear={props.clear} setClear={props.setClear} room={props.room} color={color} size={size} image={props.image} socket={props.socket} ctx={props.ctx} setctx={props.setctx} timeout={props.timeout} settimeOut={props.settimeOut}/>
            </div>
        </div>
    );
}
 
export default Container;