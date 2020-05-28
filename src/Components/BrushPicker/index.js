import React from 'react';

const BrushPicker = ({clearCanvasForGuests,
                         setBrushWidth,
                         setSelectedTool
                     }) => {
    const clearCanvas = () => {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        clearCanvasForGuests();
    };

    const changeBrushWidth = (e) => {
        const brushElement = e.target;
        const newBrushSize = brushElement.style.fontSize;
        const newWidth = parseInt(newBrushSize.substr(0,newBrushSize.length - 2));
        setBrushWidth(newWidth);
        setSelectedTool('brush');
    };

    const icons = [
        {name:'circle', font: '30px', onClick: changeBrushWidth},
        {name:'circle', font: '20px', onClick: changeBrushWidth},
        {name:'circle', font: '10px', onClick: changeBrushWidth},
        {name:'circle', font: '5px', onClick: changeBrushWidth},
        {name:'paint-roller', onClick: () => {setSelectedTool('fill')}},
        {name: 'eraser'},
        {name: 'trash', onClick: clearCanvas}
    ];

    return (
        <div className={'brush-picker'}>
            {icons.map((icon, i) =>
                <div key={i}><i className={`fas fa-${icon.name} brush`}
                        onClick={icon.onClick ? icon.onClick : null}
                        style={{fontSize: icon.font ? icon.font : '20px'}}/>
                </div>
            )}
        </div>
    );
};

export default BrushPicker;