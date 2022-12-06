import { Component, OnInit } from '@angular/core';
import { SettingsService} from '../settings.service';

@Component({
  providers: [SettingsService],
  selector: 'pixelated-editor',
  templateUrl: './pixelated-editor.component.html',
  styleUrls: ['./pixelated-editor.component.less']
})
export class PixelatedEditorComponent implements OnInit {
  paintScale = 32;
  curPaintBrush = 0;
  isPainting = false;
  isCurDrawingAnimated = false;
  curDrawingFrameIndex = 0;
  
  constructor(private settings : SettingsService) { 
  }
  
  ngOnInit() {
  }

}
