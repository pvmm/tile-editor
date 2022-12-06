import { Injectable, Optional, SkipSelf } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public tilesize:string = "8";
  constructor(@Optional() @SkipSelf() sharedSettings?: SettingsService) {
    if (sharedSettings) {
      throw new Error('SettingsService already loaded');
    }
    console.info('SettingsService created');
  }
}
