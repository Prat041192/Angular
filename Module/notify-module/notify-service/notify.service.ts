import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  show : EventEmitter<any> = new EventEmitter();
  hide : EventEmitter<any> = new EventEmitter();
  error: EventEmitter<any> = new EventEmitter();
  timeOut: Number = 5000; //time out in milli seconds
  constructor() { }
}

// helper classes for common Strings and message types in Notification Module

export class MessageType {
  public Success : string = 'success';
  public Error: string = 'error';
  public Warning: string = 'warning';
  public Info : string = 'info';
}

export class MessageString {
  public addSuccess:string =  'Added Successfully';
  public removeSuccess: string = 'Removed Successfully';
  public addError: string = 'Error Occurred while Adding';
  public removeError: string = 'Error Occurred while removing';
  public graphSuccess: string = 'Graph Created Successfully';
  public graphError: string = 'Error Creating the Garph';
  public graphRefreshSuccess: string = 'Graph re-painted successfully';
  public graphRefreshError: string = 'Error Occurred while re-painting the Graph';
  public graphNotCreated: string = 'Graph was not created. Please check the nodes list';

  //
  public noRowSelected: string = "Please double click the row to delete";

  //
  public serStartSucess: string = "Service was successfully started";
  public serStopSucess: string = "Service was successfully stopped";
  public serPauseSucess: string = "Service was successfully paused";
  public errorOccured : string = "An error Occurred";
}

