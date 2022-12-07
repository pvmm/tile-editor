import { Injectable, Optional, SkipSelf } from '@angular/core';

export const tilesize: number = 8;
   
@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    //static readonly tilesize:number = 8;
    public isPlayMode: boolean = false;
  
    constructor(@Optional() @SkipSelf() sharedSettings?: SettingsService) {
        if (sharedSettings) {
            throw new Error('SettingsService already loaded');
        }
        console.info('SettingsService created' + tilesize);
    }

    getPanelSetting(component: string, setting: string): boolean {
        return true;
    }
}

export function bitsyLog(message: string, tag: string) {
    // Do something
}
