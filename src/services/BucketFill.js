const extractRGBValuesFromRGBString = RGBString => {
    const RGB_Array = RGBString.match(/\d+/g);
    const RGB_Int_Array = RGB_Array.map(valString => parseInt(valString));
    return RGB_Int_Array.concat(255);
};

const matchStartColor = (pixelColor, startColor) => JSON.stringify(pixelColor) === JSON.stringify(startColor);

const getPixelColorInRGBA = (pixelColorData, pixelPos) => [pixelColorData[pixelPos], pixelColorData[pixelPos + 1], pixelColorData[pixelPos + 2], pixelColorData[pixelPos + 3]];

const fillPixel = (pixelColorData, pixelPos, r, g, b, a) => {
    pixelColorData[pixelPos] = r;
    pixelColorData[pixelPos + 1] = g;
    pixelColorData[pixelPos + 2] = b;
    pixelColorData[pixelPos + 3] = a !== undefined ? a : 255;
};

export const fillRegion = (startX, startY, canvas, ctx, brushColor) => {
    let brushColorInRGB = [];
    if(brushColor === '#000000') {
        brushColorInRGB = [0, 0, 0, 255];
    } else if(brushColor === '#FFFFFF') {
        brushColorInRGB = [0, 0, 0, 0];
    } else {
        brushColorInRGB = extractRGBValuesFromRGBString(brushColor);
    }

    const pixelStack = [[startX, startY]];
    const pixelData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixelColorData = pixelData.data;
    const startColor = getPixelColorInRGBA(pixelColorData, (startX + (startY * canvas.width)) * 4);

    if(JSON.stringify(startColor) === JSON.stringify(brushColorInRGB)) {
        return;
    }

    while(pixelStack.length) {
        const newPos = pixelStack.pop();
        const x = newPos[0];
        let y = newPos[1];

        let pixelPos = (y * canvas.width + x) * 4;
        while(y >= 0 && matchStartColor(getPixelColorInRGBA(pixelColorData, pixelPos), startColor)) {
            y--;
            pixelPos -= canvas.width * 4;
        }

        pixelPos += canvas.width * 4;
        y++;

        let reachLeft = false;
        let reachRight = false;

        while(y <= (canvas.height - 1) && matchStartColor(getPixelColorInRGBA(pixelColorData, pixelPos), startColor)) {
            fillPixel(pixelColorData, pixelPos, brushColorInRGB[0], brushColorInRGB[1], brushColorInRGB[2], brushColorInRGB[3]);

            if(x > 0) {
                if(matchStartColor(getPixelColorInRGBA(pixelColorData, pixelPos - 4), startColor)) {
                    if(!reachLeft) {
                        pixelStack.push([x - 1, y]);
                        reachLeft = true;
                    }
                } else if(reachLeft) {
                    reachLeft = false;
                }
            }
            if(x < (canvas.width - 1)) {
                if(matchStartColor(getPixelColorInRGBA(pixelColorData, pixelPos + 4), startColor)) {
                    if(!reachRight) {
                        pixelStack.push([x + 1, y]);
                        reachRight = true;
                    }
                } else if(reachRight) {
                    reachRight = false;
                }
            }
            y++;
            pixelPos += canvas.width * 4;
        }
    }
    ctx.putImageData(pixelData, 0, 0);
    console.log('Painting Done');
};