import { Injectable } from '@angular/core';
import { Drawing } from './app.module';



//export enum TileType {
//    Tile, Avatar, Sprite, Item
//}

export type Tile = Array<Array<number>>;

export function makeTile() {
    return [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ] as Tile;
}


type DrawingSource = Map<string, Array<Tile>>;

export class Cache {
    // each cache has 3 frames for each tile type.
    source: DrawingSource;
    render: DrawingSource;

    constructor() {
        this.source = new Map<string, Array<Tile>>();
	this.render = new Map<string, Array<Tile>>();
    }
}


@Injectable({
    providedIn: 'root'
})
export class TileRendererService {
    private drawingCache = new Cache();

    constructor() { }


    getDrawingSource(drawingId: string): Array<Tile> | undefined {
        return this.drawingCache.source.get(drawingId);
    }


    getDrawingFrameData(drawing: Drawing, frameIndex: number): Tile {
        var imageSource = this.getDrawingSource(drawing.drw);          

        if (imageSource != null) {
            return imageSource[frameIndex];
        }

	return makeTile();
        //throw Error("not found");
    }

}
