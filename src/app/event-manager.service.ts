import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class EventManagerService {
    private callbacks = new Map<string, (event: any) => void>();

    constructor() { }

    listen(eventName: string, func: (event: any) => void) {
        this.callbacks.set(eventName, func);
    }
}
