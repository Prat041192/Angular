import { Component, OnInit } from '@angular/core';
import {ToolbarService} from "../toolbar-service/toolbar.service";
import {MessageString, MessageType, NotifyService} from "../../notify-module/notify-service/notify.service";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  toolList: any;
  type: any;
    private msgType: MessageType;
  private msgString: MessageString;

  constructor(private toolBarService: ToolbarService,
              private notifyService: NotifyService) {
    this.toolList = [];
    this.toolBarService.toolBarList.subscribe(data => this.toolList.push(data),
      error => console.log(error),
      () => console.log("Completed")
    );
    this.msgType = new MessageType();
    this.msgString = new MessageString();
  }

  ngOnInit() {
    this.toolBarService.removeDataList = []; // clearing the list if there is any id
  }

  iconClicked(type, event) {
    this.type = ''; // needed to remove the refrence of the previous view child
    let childName = `#${type}${this.toolBarService.type}`;
    if (type == 'remove') {
      this.checkListsize().then(
        () => {
          this.sendDataToModal().then(
            ()=> {
              this.type = childName;
            }
          )
        },
        () => {
          this.showNotifcation().then(()=>{
            // this.type = childName;
          })
        }
      )
    }
    else {
      this.type = childName;
    }
  }

  //notofication promise
  showNotifcation(){
    return new Promise((resolve) => {
      this.notifyService.show.emit({'type': this.msgType.Warning, 'message': this.msgString.noRowSelected})
      resolve();
    });
  }

  // removeDataListLength prommise
  checkListsize(){
    return new Promise ((resolve, reject) => {
      if(this.toolBarService.removeDataList.length > 0) {
        resolve();
      }
      else
        reject();
    });
  }

  sendDataToModal(){
    return new Promise((resolve)=>{
       this.toolBarService.remove.emit(this.toolBarService.removeDataList);
       resolve()
    });
  }
}
