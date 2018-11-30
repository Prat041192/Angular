import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifyComponent } from "./notify/notify.component";
import { NotifyService } from "./notify-service/notify.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NotifyComponent
  ],
  providers: [NotifyService],
  exports: [NotifyComponent]
})
export class NotifyModule { }
