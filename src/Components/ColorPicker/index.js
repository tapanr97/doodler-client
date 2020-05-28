import React from 'react';

const getColorPalette = () => {
    const colorPalette = [];

    const pinkPalette = ['#880E4F', '#E91E63', '#F48FB1'];
    const purplePalette = ['#4A148C', '#9C27B0', '#CE93D8'];
    const bluePalette = ['#0D47A1', '#2196F3', '#90CAF9'];
    const tealPalette = ['#004D40', '#009688', '#80CBC4'];
    const greenPalette = ['#1B5E20', '#4CAF50', '#A5D6A7'];

    const paletteRow1 = pinkPalette.concat(purplePalette.concat(bluePalette.concat(tealPalette.concat(greenPalette))));

    const yellowPalette = ['#F57F17', '#FFEB3B', '#FFF59D'];
    const orangePalette = ['#E65100', '#FF9800', '#FFCC80'];
    const redPalette = ['#B71C1C', '#F44336', '#EF9A9A'];
    const brownPalette = ['#3E2723', '#795548', '#BCAAA4'];
    const greyPalette = ['#000000', '#616161', '#FFFFFF'];

    const paletteRow2 = yellowPalette.concat(orangePalette.concat(redPalette.concat(brownPalette.concat(greyPalette))));

    colorPalette.push(paletteRow1);
    colorPalette.push(paletteRow2);

    return colorPalette
};

const Toolbar = ({setBrushColor}) => {
    const colorPalette = getColorPalette();

    const onColorChange = (e) => {
        setBrushColor(e.target.style.backgroundColor);
    };

    return (
        <div className={'toolbar'}>
            <div style={{display: 'flex'}}>
                {colorPalette[0].map((color, i) => <div key={i} style={{backgroundColor: color, height: '25px', width: '25px'}}
                                                   onClick={onColorChange}>
                    {/*<i className={'fas fa-check single-color-box'} style={{color: color === '#000000' ? 'white' : 'black'}}/>*/}
                </div>)}
            </div>
            <div style={{display: 'flex'}}>
                {colorPalette[1].map((color, i) => <div key={i} style={{backgroundColor: color, height: '25px', width: '25px'}}
                                                   onClick={onColorChange}>
                    {/*<i className={'fas fa-check single-color-box'} style={{color: color === '#000000' ? 'white' : 'black'}}/>*/}
                </div>)}
            </div>
        </div>
    )
};

export default Toolbar;