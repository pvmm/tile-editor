import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SettingsService, bitsyLog, tilesize } from '../settings.service';
import { EventManagerService } from '../event-manager.service';
import { drawing, getOffset, mobileOffsetCorrection, getCurrentPalette, getPal, TileType, getContrastingColor } from '../app.module';


const paint_scale:number = 32;


@Component({
    selector: 'pixelated-editor',
    templateUrl: './pixelated-editor.component.html',
    styleUrls: ['../../styles.css', './bitsyEditorStyle.css', './dialogToolStyle.css', './pixelated-editor.component.css']
})
export class PixelatedEditorComponent implements AfterViewInit {
    @ViewChild('paint', {static: false, read: ElementRef}) canvas!: ElementRef<HTMLCanvasElement>;
    private curPaintBrush:number = 0;
    private isPainting:boolean = false;
    private isCurDrawingAnimated:boolean = false;
    private curDrawingFrameIndex:number = 0;
    private drawPaintGrid:boolean = false;
    private ctx!: CanvasRenderingContext2D | null;
  
    // methods for updating the UI
    //private onReloadTile?:object = undefined;
    //private onReloadSprite?:object = undefined;
    //private onReloadItem?:object = undefined;

    constructor(private settings: SettingsService, private events: EventManagerService) { 
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
        let canvas: HTMLCanvasElement = this.canvas.nativeElement;

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

    updateCanvas() { }
}

declare var getDrawingFrameData: any;
