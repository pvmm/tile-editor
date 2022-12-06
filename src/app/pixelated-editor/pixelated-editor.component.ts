import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SettingsService, bitsyLog, tilesize } from '../settings.service';
import { drawing, getOffset, mobileOffsetCorrection, getCurrentPalette, getPal, TileType, getContrastingColor } from '../app.module';


const paint_scale:number = 32 ;


@Component({
  selector: 'pixelated-editor',
  templateUrl: './pixelated-editor.component.html',
  styleUrls: ['./pixelated-editor.component.less']
})
export class PixelatedEditorComponent implements AfterViewInit {
  @ViewChild('paint', {static: false}) canvas!: ElementRef<HTMLCanvasElement>;
  private curPaintBrush:number = 0;
  private isPainting:boolean = false;
  private isCurDrawingAnimated:boolean = false;
  private curDrawingFrameIndex:number = 0;
  private drawPaintGrid:boolean = false;
  private ctx!: CanvasRenderingContext2D | null;
  
  constructor(private settings : SettingsService) { 
    console.log("tilesize = ", tilesize);
    	this.drawPaintGrid = (settings.getPanelSetting("paintPanel", "grid") != false);
	  this.updatePaintGridCheck(this.drawPaintGrid);	  
  }

  ngAfterViewInit() {
    var canvas = this.canvas.nativeElement;
    
    // define paint canvas & context
    canvas.width = tilesize * paint_scale;
    canvas.height = tilesize * paint_scale;
    if (this.ctx == null) {
      throw Error("context is null");
    }
    // paint events
    canvas.addEventListener("mousedown", this.onMouseDown);
    //canvas.addEventListener("mousemove", onMouseMove);
    //canvas.addEventListener("mouseup", onMouseUp);
    //canvas.addEventListener("mouseleave", onMouseUp);
    //canvas.addEventListener("touchstart", onTouchStart);
    //canvas.addEventListener("touchmove", onTouchMove);
    //canvas.addEventListener("touchend", onTouchEnd);
  }


  drawGrid(gridDivisions: any, lineColor: any) {
    var ctx = this.ctx;
    ctx!!.fillStyle = lineColor;

    var gridSize = this.canvas.nativeElement.width; // assumes width === height
    var gridSpacing = (gridSize / gridDivisions);

    // vertical lines
    for (var x = 1; x < gridDivisions; x++) {
      ctx!!.fillRect(x * gridSpacing, 0 * gridSpacing, 1, gridSize);
    }

    // horizontal lines
    for (var y = 1; y < gridDivisions; y++) {
      ctx!!.fillRect(0 * gridSpacing, y * gridSpacing, gridSize, 1);
    }
  }

  
  updatePaintGridCheck(value: boolean) {
    return 0;
  }
  

  // todo: assumes 2 frames
  curDrawingAltFrameData() {
    var frameIndex = (this.curDrawingFrameIndex === 0 ? 1 : 0);
    return getDrawingFrameData(drawing, frameIndex);
  }

  curDrawingData() {
    var frameIndex = (this.isCurDrawingAnimated ? this.curDrawingFrameIndex : 0);
    return getDrawingFrameData(drawing, frameIndex);
  }

  onMouseDown(e: any) {
		e.preventDefault();
		
		if (this.settings.isPlayMode) {
			return; //can't paint during play mode
		}

		bitsyLog("PAINT TOOL!!!", "editor");
		bitsyLog(e, "editor");

		var off = getOffset(e);

		off = mobileOffsetCorrection(off,e,(tilesize));

		var x = Math.floor(off.x);
		var y = Math.floor(off.y);

		// non-responsive version
		// var x = Math.floor(off.x / paint_scale);
		// var y = Math.floor(off.y / paint_scale);

		if (this.curDrawingData()[y][x] == 0) {
			this.curPaintBrush = 1;
		}
		else {
			this.curPaintBrush = 0;
		}
		this.curDrawingData()[y][x] = this.curPaintBrush;
		this.updateCanvas();
		this.isPainting = true;
  }
	
  updateCanvas() {
		var palId = getCurrentPalette();
		var palColors = getPal(palId);
		var canvas = this.canvas.nativeElement;
		var ctx = this.ctx;

		//background
		ctx!!.fillStyle = "rgb(" + palColors[0][0] + "," + palColors[0][1] + "," + palColors[0][2] + ")";
		ctx!!.fillRect(0, 0, canvas.width, canvas.height);

		//pixel color
		if (drawing.type === TileType.Tile) {
			ctx!!.fillStyle = "rgb(" + palColors[1][0] + "," + palColors[1][1] + "," + palColors[1][2] + ")";
		}
		else if (drawing.type === TileType.Sprite || drawing.type === TileType.Avatar || drawing.type === TileType.Item) {
			ctx!!.fillStyle = "rgb(" + palColors[2][0] + "," + palColors[2][1] + "," + palColors[2][2] + ")";
		}

		// draw pixels
		for (var x = 0; x < tilesize; x++) {
			for (var y = 0; y < tilesize; y++) {
				// draw alternate frame
				if (this.isCurDrawingAnimated && this.curDrawingAltFrameData()[y][x] === 1) {
					ctx!!.globalAlpha = 0.3;
					ctx!!.fillRect(x*paint_scale,y*paint_scale,1*paint_scale,1*paint_scale);
					ctx!!.globalAlpha = 1;
				}
				// draw current frame
				if (this.curDrawingData()[y][x] === 1) {
					ctx!!.fillRect(x*paint_scale,y*paint_scale,1*paint_scale,1*paint_scale);
				}
			}
		}

		// draw grid
		if (this.drawPaintGrid) {
			this.drawGrid(tilesize, getContrastingColor());
		}
	}
}

declare var getDrawingFrameData: any;
