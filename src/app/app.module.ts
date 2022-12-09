import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PixelatedEditorComponent } from './pixelated-editor/pixelated-editor.component';
import { SettingsService } from './settings.service';
import { EventManagerService } from './event-manager.service';
import { TileRendererService } from './tile-renderer.service';


export var getOffset: any;
export var createDrawingData: any;
export var mobileOffsetCorrection: any;
//export var getDrawingFrameData: any; // from utils.js


type Palette = {
    id?: string,
    colors: Array<Array<number>>,
    name?: string
};

type Palettes = Record<string | number, Palette | undefined>;

const palette: Palettes = {
    default: {
        name: 'default',
        colors: [[1,2,3], [4,5,6], [7,8,9]]
    },
    0: {
        name: 'blueprint',
        colors: [[1,2,3], [4,5,6], [7,8,9]]
    }
}

//export type TileType = 'apple' | 'orange' | 'banana';

export const TileType = {
        Tile : "TIL",
        Sprite : "SPR",
        Avatar : "AVA",
        Item : "ITM",
};


export type Drawing = {
    //animation: object;
    id: string;
    drw: string;
    col: number;
    name: string;
    type: string;
};


export const drawing: Drawing = {
    id: "a",
    drw: "TIL_a",
    col: 1,
    name: "block",
    type: "TIL"
};


/**
 * From: http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
 *
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {Array}           The HSL representation
 */
function rgbToHsl(r: number, g: number, b: number) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b);
    var  min = Math.min(r, g, b);
    var h: number = (max + min) / 2;
    var s: number = (max + min) / 2;
    var l: number = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}


// Sort of a hack for legacy palette code (when it was just an array)
export function getPal(id: string | number) {
    if (palette[id] === undefined) {
        id = "default";
    }

    return palette[id]?.colors;
}


function curDefaultPal() {
    return 'default';
}


function isColorDark(palId: string | number | undefined): boolean | undefined {
    if (palId === undefined) {
        palId = curDefaultPal();
    }
    if (getPal(palId) !== undefined) {
        var hsl = rgbToHsl(getPal(palId)![0][0], getPal(palId)![0][1], getPal(palId)![0][2]);
        var lightness = hsl[2];

        return lightness <= 0.5;
    }
    return undefined;
}


export function getContrastingColor(palId: string | number | undefined = undefined) {
        if (isColorDark(palId)) {
                return "#fff";
        }
        else {
                return "#000";
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
