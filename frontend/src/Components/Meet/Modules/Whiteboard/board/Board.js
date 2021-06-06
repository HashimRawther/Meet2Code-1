import React, { useEffect } from 'react';
import './board.css';
const Board=(props)=> {
    useEffect(()=>{
        if(props.ctx===undefined) return;
        props.ctx.strokeStyle = props.color;
        props.ctx.lineWidth = props.size;
        if(props.image!==undefined && props.image.src!=="http://localhost:3000/null")
            props.ctx.drawImage(props.image,0,0);
    },[props.image,props.color,props.size,props.ctx]);
    useEffect(()=>{
        if(props.clear===1)
        {
            props.setClear(0);
            let canvas = document.querySelector('#board');
            props.ctx.clearRect(0,0,canvas.width,canvas.height);
            props.socket.emit('clear',props.room);
        }
        else if(props.clear===2)
        {
            props.setClear(0);
            let canvas = document.querySelector('#board');
            props.ctx.clearRect(0,0,canvas.width,canvas.height);
        }
        // eslint-disable-next-line
    },[props.clear]);
    useEffect(()=>{
        var canvas = document.querySelector('#board');
        const drawOnCanvas=(canvas)=>{
            var ctx = canvas.getContext('2d');
            props.setctx(ctx);
            var sketch = document.querySelector('#sketch');
            var sketch_style = getComputedStyle(sketch);
            canvas.width = parseInt(sketch_style.getPropertyValue('width'));
            canvas.height = parseInt(sketch_style.getPropertyValue('height'));
    
            var mouse = {x: 0, y: 0};
            var last_mouse = {x: 0, y: 0};
    
            /* Mouse Capturing Work */
            canvas.addEventListener('mousemove', function(e) {
                last_mouse.x = mouse.x;
                last_mouse.y = mouse.y;
    
                mouse.x = e.pageX - this.offsetLeft;
                mouse.y = e.pageY - this.offsetTop;
            }, false);
    
    
            /* Drawing on Paint App */
            ctx.lineWidth = 5;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.strokeStyle = "black";
    
            canvas.addEventListener('mousedown', function(e) {
                canvas.addEventListener('mousemove', onPaint, false);
            }, false);
    
            canvas.addEventListener('mouseup', function() {
                canvas.removeEventListener('mousemove', onPaint, false);
                var base64ImageData = canvas.toDataURL("image/png");
                props.socket.emit("canvas-data",base64ImageData,props.room);
            }, false);
    
            var onPaint = function() {
                ctx.beginPath();
                ctx.moveTo(last_mouse.x, last_mouse.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.closePath();
                ctx.stroke();
            };
        }
        drawOnCanvas(canvas);
        // eslint-disable-next-line
    },[])
    return (  
            <div className='sketch' id='sketch'>
            <canvas className='board' id='board'></canvas>
            </div>
        );
}
export default Board;