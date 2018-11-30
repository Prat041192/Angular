import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { ToolbarService } from "./toolbar-service/toolbar.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ModalPopUpComponent} from "./modal-pop-up/modal-pop-up.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ToolbarComponent,
    ModalPopUpComponent
  ],
  providers: [
    ToolbarService,
  ],
  exports: [
    ToolbarComponent
  ]
})
export class ToolbarModule { }
