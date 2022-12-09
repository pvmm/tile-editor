import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PixelatedEditorComponent } from './pixelated-editor/pixelated-editor.component';
// import { bla } from './app.module';



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    @ViewChild(PixelatedEditorComponent) editor!: PixelatedEditorComponent;

    private title = 'sample-app';


    ngOnInit() {
        console.log("onInit()");
    }


    callPaint() {
        try {
            console.log("callPaint() called.");
            if (this.editor == undefined) {
                throw Error("Pixelated Editor is undefined");
	    }
            this.editor.update();
	} catch (e) {
            console.error(e);
        }
    }
}
