import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PixelatedEditorComponent } from './pixelated-editor/pixelated-editor.component';
import { SettingsService } from './settings.service';
import { EventManagerService } from './event-manager.service';
import { TileRendererService } from './tile-renderer.service';


export var bla: any;
export var drawing: any;
export var getOffset: any;
export var createDrawingData: any;
export var mobileOffsetCorrection: any;
export var getCurrentPalette: any;
export var getPal: any;
export var getContrastingColor: any;
export var getDrawingFrameData: any; // from utils.js


export enum TileType {
    Tile, Avatar, Sprite, Item
}


export class DrawingType {
    type: TileType;

    constructor(type: TileType) {
        this.type = type;
    }
}


@NgModule({
  declarations: [
    AppComponent,
    PixelatedEditorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [SettingsService, EventManagerService, TileRendererService],
  bootstrap: [AppComponent]
})
export class AppModule { }
