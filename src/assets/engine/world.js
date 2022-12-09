function mobileOffsetCorrection() {
}


function getOffset(x) {
}


function createDrawingData(type, id) {
}


// todo : rename function
function getDrawingImageSource(drawing) {
    return renderer.GetDrawingSource(drawing.drw);
}


function getDrawingFrameData(drawing, frameIndex) {
    var imageSource = getDrawingImageSource(drawing);
    return imageSource[frameIndex];
}
