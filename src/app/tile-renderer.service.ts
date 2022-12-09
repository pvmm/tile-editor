import { Injectable } from '@angular/core';



export class Drawing {
    drw: number = 0;

    construct(drawingId: number) {
        this.drw = drawingId;
    }
}


export class Cache {
    source = new Map<number, Map<number, object>>();
    render = new Map<number, Map<number, object>>();
}


@Injectable({
    providedIn: 'root'
})
export class TileRendererService {
    private drawingCache = new Cache();

    constructor() { }


    getDrawingSource(drawingId: number) {
        return this.drawingCache.source.get(drawingId);
    }


    getDrawingFrameData(drawing: Drawing, frameIndex: number) {
        var imageSource = this.getDrawingSource(drawing.drw);          

        if (imageSource != null) {
            return imageSource.get(frameIndex);
        }

        return undefined;
    }

}
