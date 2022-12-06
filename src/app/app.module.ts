import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PixelatedEditorComponent } from './pixelated-editor/pixelated-editor.component';
import { SettingsService} from './settings.service';

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
