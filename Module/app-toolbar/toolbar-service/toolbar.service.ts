import {EventEmitter, Injectable, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {


  //toolbar icons
  toolBarList = Observable.of(
    {name: "Add", iconClass: "fa fa-plus-circle fa", clickMethod: "add"},
    {name: "Remove", iconClass: "fa fa-minus-circle fa", clickMethod: "remove"}
  );

  // calling route
  type: string = '';


  // toolbar events
  add: EventEmitter<any> = new EventEmitter<any>();
  remove: EventEmitter<any> = new EventEmitter<any>();
  removeSuccess: EventEmitter<any> = new EventEmitter<any>();
  save: EventEmitter<any> = new EventEmitter<any>();


  // application specific need to create the delete list
  removeDataList: any [];

  constructor() {
    this.removeDataList = [];
  }


}
