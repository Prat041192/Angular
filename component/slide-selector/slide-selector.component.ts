///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-slide-selector',
  templateUrl: './slide-selector.component.html',
  styleUrls: ['./slide-selector.component.css']
})
export class SlideSelectorComponent implements OnInit {

  @Input('right') 'Right': string;
  @Input('left') 'Left': string;

  @Output('onClick') onClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  onSliderClicked(event) {
    this.onClicked.emit(event);
  }
}
