import { Injectable } from '@angular/core';



export class Drawing {
    drw: string;

    construct(drawingId: string) {
        this.drw = drawingId;
    }
}


export class Cache {
    // each cache has 3 frames for each tile type.
    source = new Map<string, Array<Drawing>>();
    render = new Map<string, Array<Drawing>>();
}


@Injectable({
    providedIn: 'root'
})
export class TileRendererService {
    private drawingCache = new Cache();

    constructor() { }


    getDrawingSource(drawingId: string) {
        return this.drawingCache.source.get(drawingId);
    }


    getDrawingFrameData(drawing: Drawing, frameIndex: number) {
        var imageSource = this.getDrawingSource(drawing.drw);          

        if (imageSource != null) {
            return imageSource[frameIndex];
        }

        return undefined;
    }

}
