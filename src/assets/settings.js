import { TileRenderer } from './engine/renderer.js';
import { getDrawingFrameData } from './utils.js';


const TileType = {
        Tile : "TIL",
        Sprite : "SPR",
        Avatar : "AVA",
        Item : "ITM",
};

let palette = { // start off with a default palette
    "default" : {
        name : "default",
        colors : [[0,0,0],[255,255,255],[255,255,255]]
    }
};


function getCurrentPalete() {
    return 0;
}


// Sort of a hack for legacy palette code (when it was just an array)
function getPal(id) {
    if (palette[id] === undefined) {
        id = "default";
    }

    return palette[ id ].colors;
}


function getContrastingColor(palId) {
  if (isColorDark(palId)) {
    return "#fff";
  } else {
    return "#000";
  }
}


var renderer = new TileRenderer();
