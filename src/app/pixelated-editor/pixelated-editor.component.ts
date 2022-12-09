import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SettingsService, bitsyLog, tilesize } from '../settings.service';
import { EventManagerService } from '../event-manager.service';
import { TileRendererService, Tile, makeTile } from '../tile-renderer.service';
import { TileType, drawing, getOffset, mobileOffsetCorrection, getPal,
	 getContrastingColor } from '../app.module';


const paint_scale:number = 32;


@Component({
    selector: 'pixelated-editor',
    templateUrl: './pixelated-editor.component.html',
    styleUrls: ['./bitsyEditorStyle.css', './dialogToolStyle.css', './pixelated-editor.component.css']
})
export class PixelatedEditorComponent implements AfterViewInit {
    @ViewChild('paint', {static: false, read: ElementRef}) canvas: ElementRef<HTMLCanvasElement>;
    private curPaintBrush:number = 0;
    private isPainting:boolean = false;
    private isCurDrawingAnimated:boolean = false;
    private curDrawingFrameIndex:number = 0;
    private drawPaintGrid:boolean = false;
    private ctx: CanvasRenderingContext2D | null;

    // methods for updating the UI
    private onReloadTile?: Function= undefined;
    private onReloadSprite?: Function = undefined;
    private onReloadItem?: Function = undefined;

    // Component data
    //private drawing = makeTile();

  
    constructor(private settings: SettingsService,
		private events: EventManagerService,
		private renderer: TileRendererService) { 

        console.log("tilesize = ", tilesize);
        this.drawPaintGrid = (settings.getPanelSetting("paintPanel", "grid") != false);
        //this.updatePaintGridCheck(this.drawPaintGrid);
    }


    ngAfterViewInit() {
        console.log("ngAfterViewInit() called.");
        try {
            this.afterViewInit();
        } catch(e) {
            console.log(e);
        }
        console.log("ngAfterViewInit() finished.");
    }


    afterViewInit() {
        console.log("afterViewInit() called.");
        let canvas: HTMLCanvasElement = this.canvas!.nativeElement!;

        this.ctx = canvas.getContext("2d");
        if (this.ctx == null) {
            throw Error("context is null");
        }
    
        // define paint canvas & context
        canvas.width = tilesize * paint_scale;
        console.log('canvas.width = ', canvas.width);
        canvas.height = tilesize * paint_scale;
        console.log('canvas.height = ', canvas.height);

        // paint events
        canvas.addEventListener("mousedown", this.onMouseDown);
        //canvas.addEventListener("mousemove", this.onMouseMove);
        //canvas.addEventListener("mouseup", thisonMouseUp);
        //canvas.addEventListener("mouseleave", this.onMouseUp);
        //canvas.addEventListener("touchstart", this.onTouchStart);
        //canvas.addEventListener("touchmove", this.onTouchMove);
        //canvas.addEventListener("touchend", this.onTouchEnd);

        this.events.listen("palette_change", (event) => {
            this.updateCanvas();

            if (this.isCurDrawingAnimated) {
                // TODO -- this animation stuff needs to be moved in here I think?
                // renderAnimationPreview(drawing);
            }
        });
        console.log("afterViewInit() finished");
    }


    onMouseDown(e: any) { }


    update() {
        this.updateCanvas();
    }


    // todo: assumes 2 frames
    curDrawingAltFrameData(): Tile {
        console.log("curDrawingAllFrameData() called");
        var frameIndex = (this.curDrawingFrameIndex === 0 ? 1 : 0);
        return this.renderer.getDrawingFrameData(drawing, frameIndex);
    }


    curDrawingData() {
        console.log("curDrawingData() called");
        var frameIndex = (this.isCurDrawingAnimated ? this.curDrawingFrameIndex : 0);
        return this.renderer.getDrawingFrameData(drawing, frameIndex);
    }


    drawGrid(gridDivisions: number, lineColor: any) {
        var ctx = this.canvas!.nativeElement!.getContext("2d")!;
	var canvas = this.canvas!.nativeElement;
        ctx.fillStyle = lineColor;

        var gridSize = canvas.width; // assumes width === height
        var gridSpacing = (gridSize / gridDivisions);

        // vertical lines
        for (var x = 1; x < gridDivisions; x++) {
            ctx.fillRect(x * gridSpacing, 0 * gridSpacing, 1, gridSize);
        }

        // horizontal lines
        for (var y = 1; y < gridDivisions; y++) {
            ctx.fillRect(0 * gridSpacing, y * gridSpacing, gridSize, 1);
        }
    }


    updateCanvas() {
        let ctx = this.ctx!;
        let canvas = this.canvas!.nativeElement!;
	// TODO: move to settings
        let palColors = [[0, 82, 204], [128, 159, 255], [255, 255, 255]];

        //background
        ctx.fillStyle = "rgb(" + palColors[0][0] + "," + palColors[0][1] + "," + palColors[0][2] + ")";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        console.log("updateCanvas() done.");

        //pixel color
        if (drawing.type === TileType.Tile) {
            ctx.fillStyle = "rgb(" + palColors[1][0] + "," + palColors[1][1] + "," + palColors[1][2] + ")";
        }
        else if (drawing.type === TileType.Sprite || drawing.type === TileType.Avatar || drawing.type === TileType.Item) {
            ctx.fillStyle = "rgb(" + palColors[2][0] + "," + palColors[2][1] + "," + palColors[2][2] + ")";
        }

        //draw pixels
        for (var x = 0; x < tilesize; x++) {
            for (var y = 0; y < tilesize; y++) {
                // draw alternate frame
                if (this.isCurDrawingAnimated && this.curDrawingAltFrameData()[y][x] === 1) {
                    ctx.globalAlpha = 0.3;
                    ctx.fillRect(x*paint_scale,y*paint_scale,1*paint_scale,1*paint_scale);
                    ctx.globalAlpha = 1;
                }
                // draw current frame
                if (this.curDrawingData()[y][x] === 1) {
                    ctx.fillRect(x*paint_scale,y*paint_scale,1*paint_scale,1*paint_scale);
                }
            } 
        }

        // draw grid
        if (this.drawPaintGrid) {
            this.drawGrid(tilesize, getContrastingColor());
        }
    }


    reloadDrawing() {
        console.log("reloadDrawing() called");
        if (drawing.type === TileType.Tile) {
            if (this.onReloadTile) {
                this.onReloadTile();
            }
        }
        else if (drawing.type === TileType.Avatar || drawing.type === TileType.Sprite) {
            if (this.onReloadSprite) {
                this.onReloadSprite(); 
            }
        }
        else if (drawing.type === TileType.Item) {
            if (this.onReloadItem) {
                this.onReloadItem();
            }
        }
        else {
            console.error("Don't know what to reload!");
        }

        // hack to force update of new menu
        //self.menu.update();
    }
}

