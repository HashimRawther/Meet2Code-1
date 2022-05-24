const updateCanvasListener =(socket,ctx,setImage) =>{
    socket.on("canvas-data", function (data) {
        var image = new Image();
        image.onload = function () {
            if (ctx === undefined) return;
            ctx.drawImage(image, 0, 0);
        };
        image.src = data;
        setImage(image);
    })
}

const stopCanvasListeners = (socket) =>{
    socket.off("canvas-data");
}

export {updateCanvasListener,stopCanvasListeners}