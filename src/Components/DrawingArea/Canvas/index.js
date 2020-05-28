import React from 'react';
import {fillRegion} from "../../../services/BucketFill";
import _, {floor} from 'lodash';

class Canvas extends React.Component {

    constructor(props) {
        super(props);
        this.isPainting = false;
        this.prevPos = {offsetX: 0, offsetY: 0};
        this.ctx = null;
        this.canvas = null;
        this.canvasBounds = null;
    }

    drawLine = (currentPos) => {
        this.ctx.beginPath();
        this.ctx.lineWidth = this.props.brushWidth * this.scaleUpRatioX();
        this.ctx.strokeStyle = this.props.brushColor;
        this.ctx.moveTo(this.prevPos.offsetX, this.prevPos.offsetY);
        this.ctx.lineTo(currentPos.offsetX, currentPos.offsetY);
        this.ctx.stroke();
        const line = {
            prevPos: this.prevPos,
            currentPos,
            lineStyle: {color: this.ctx.strokeStyle, width: this.ctx.lineWidth}
        };
        this.props.sendLineCoordinates(line);
        this.prevPos = currentPos;
    };

    scaleUpRatioX = () => {
        this.canvasBounds = this.canvas.getBoundingClientRect();
        return this.canvas.width / this.canvasBounds.width;
    };

    scaleUpRatioY = () => {
        this.canvasBounds = this.canvas.getBoundingClientRect();
        return this.canvas.height / this.canvasBounds.height;
    };

    onMouseDown = (e) => {
        const {offsetX, offsetY} = e;
        const scaledOffSetX = floor(this.scaleUpRatioX() * offsetX);
        const scaledOffSetY = floor(this.scaleUpRatioY() * offsetY);

        console.log(this.props.selectedTool);
        if (this.props.selectedTool === 'fill') {
            this.isPainting = false;
            fillRegion(scaledOffSetX, scaledOffSetY, this.canvas, this.ctx, this.props.brushColor);
            this.props.fillRegionForGuests({offsetX, offsetY, brushColor: this.props.brushColor});
        } else {
            this.isPainting = true;
            this.prevPos = {offsetX: scaledOffSetX, offsetY: scaledOffSetY};
            console.log(offsetX + " " + offsetY);
            this.drawLine(this.prevPos);
        }
    };

    onMouseMove = (e) => {
        if (this.isPainting) {
            const {offsetX, offsetY} = e;
            const scaledOffSetX = floor(this.scaleUpRatioX() * offsetX);
            const scaledOffSetY = floor(this.scaleUpRatioY() * offsetY);
            const currentPos = {offsetX: scaledOffSetX, offsetY: scaledOffSetY};
            this.drawLine(currentPos);
        }
    };

    endPaintEvent = () => {
        if (this.isPainting) {
            this.isPainting = false;
        }
    };

    getCursor = () => {
        // console.log(this.props.brushWidth);
        if (this.props.selectedTool === 'fill') {
            return 'url(' + require('../../../Images/fillRegionCursor.png') + '), auto';
        } else if (this.props.brushWidth === 30) {
            return 'url(' + require('../../../Images/rsz_3blackdotsvg.png') + '), auto';
        } else if (this.props.brushWidth === 20) {

        } else if (this.props.brushWidth === 10) {

        } else if (this.props.brushWidth === 5) {

        }
    };

    onMouseOver = () => {
        if (this.canvas) {
            // this.canvas.style.cursor = this.getCursor();
        }
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!_.isEqual(nextProps.line, this.props.line)) {
            if (this.ctx && nextProps.line) {
                const {prevPos, currentPos} = nextProps.line;
                this.ctx.lineWidth = nextProps.line.lineStyle.width;
                this.ctx.beginPath();
                this.ctx.strokeStyle = nextProps.line.lineStyle.color;
                this.ctx.moveTo(prevPos.offsetX, prevPos.offsetY);
                this.ctx.lineTo(currentPos.offsetX, currentPos.offsetY);
                this.ctx.stroke();
                this.ctx.lineWidth = this.props.brushWidth;
                this.ctx.strokeStyle = this.props.brushColor;
            }
        } else if (!_.isEqual(nextProps.fillRegionMetaData, this.props.fillRegionMetaData)) {
            if (this.ctx && nextProps.fillRegionMetaData) {
                const scaledOffSetX = floor(this.scaleUpRatioX() * nextProps.fillRegionMetaData.offsetX);
                const scaledOffSetY = floor(this.scaleUpRatioY() * nextProps.fillRegionMetaData.offsetY);

                fillRegion(
                    scaledOffSetX,
                    scaledOffSetY,
                    this.canvas,
                    this.ctx,
                    nextProps.fillRegionMetaData.brushColor
                );
            }
        }
        if(nextProps.isAllowedToDraw) {
            this.canvas.onmousedown = this.onMouseDown;
            this.canvas.onmousemove = this.onMouseMove;
            this.canvas.onmouseleave = this.endPaintEvent;
            this.canvas.onmouseup = this.endPaintEvent;
        } else {
            this.canvas.onmousedown = null;
            this.canvas.onmousemove = null;
            this.canvas.onmouseleave = null;
            this.canvas.onmouseup = null;
        }
    }

    componentDidMount() {
        this.canvas = document.getElementById('canvas');
        this.canvas.width = 600;
        this.canvas.height = 600;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.lineCap = 'round';
        this.ctx.lineWidth = this.props.brushWidth;
        this.ctx.strokeStyle = this.props.brushColor;
        if(this.props.isAllowedToDraw) {
            this.canvas.onmousedown = this.onMouseDown;
            this.canvas.onmousemove = this.onMouseMove;
            this.canvas.onmouseleave = this.endPaintEvent;
            this.canvas.onmouseup = this.endPaintEvent;
        }
    }

    render() {
        return (
                <canvas
                    id={'canvas'}
                    className={'drawing-canvas'}
                />
        )
    }
}

export default Canvas;