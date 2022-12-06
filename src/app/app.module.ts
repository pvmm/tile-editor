import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PixelatedEditorComponent } from './pixelated-editor/pixelated-editor.component';
import { SettingsService } from './settings.service';


export var TileType: any;
export var bla: any;
export var drawing: any;
export var getOffset: any;
export var createDrawingData: any;
export var mobileOffsetCorrection: any;
export var getCurrentPalette: any;
export var getPal: any;
export var getContrastingColor: any;


@NgModule({
  declarations: [
    AppComponent,
    PixelatedEditorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [SettingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
