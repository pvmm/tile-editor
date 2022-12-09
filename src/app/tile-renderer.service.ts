import { Injectable } from '@angular/core';



export class Drawing {
    drw: number = 0;

    construct(drawingId: number) {
        this.drw = drawingId;
    }
}


export class Cache {
    source = new Array<Array<Drawing>>();
    render = new Array<Array<Drawing>>();
}


@Injectable({
    providedIn: 'root'
})
export class TileRendererService {
    private drawingCache = new Cache();

    constructor() { }


    getDrawingSource(drawingId: number) {
        return this.drawingCache.source[drawingId];
    }


    getDrawingFrameData(drawing: Drawing, frameIndex: number) {
        var imageSource = this.getDrawingSource(drawing.drw);          

        if (imageSource != null) {
            return imageSource[frameIndex];
        }

        return undefined;
    }

}
