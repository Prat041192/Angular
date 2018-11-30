import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { NotifyService, MessageType, MessageString} from "../notify-service/notify.service";

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {

  notificationClass: string = 'alert '; // leave a space after the class if a new classes is added for sting formatting
  type: string = '';
  message: string;
  show: boolean = false;
  notificationType: MessageType;

  constructor( private notifyService: NotifyService,
               private ref : ChangeDetectorRef) {
    this.notificationType = new MessageType();

    this.notifyService.show.subscribe(data => {
        this.notificationClass = "alert ";
        this.message = "";
        this.showAlert(data).then(() => {
          setTimeout(data => {
            this.notifyService.hide.emit('')
          }, this.notifyService.timeOut);

        });
      },
      error => {
        console.log('Error occurred')
      },
      () => {
      }
    );
    this.notifyService.hide.subscribe(data => {
        if (this.show != false) {
          this.show = false;
          this.ref.detectChanges();
        }
      },
      error => {
        console.log('Error occurred')
      },
      () => {
        console.log('Completed')
      }
    )
  }

  ngOnInit() {
  }

  showAlert(data: any){
    return new Promise((resolve)=>{
      switch (data.type) {
          case this.notificationType.Success:
            this.notificationClass += 'notifySuccess '; // leave a space after the class if a new classes is added for sting formatting
            break;
          case this.notificationType.Error:
            this.notificationClass += 'notifyError '; // leave a space after the class if a new classes is added for sting formatting
            break;
          case this.notificationType.Warning:
            this.notificationClass += 'notifyWarning '; // leave a space after the class if a new classes is added for sting formatting
            break;
          case this.notificationType.Info:
            this.notificationClass += 'notifyInfo '; // leave a space after the class if a new classes is added for sting formatting
            break;
        }

        this.message = data.message;
        this.show = true;
        this.ref.detectChanges();
        resolve();
    })
  }

}
