import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ToolbarService} from "../toolbar-service/toolbar.service";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal-pop-up',
  templateUrl: './modal-pop-up.component.html',
  styleUrls: ['./modal-pop-up.component.css']
})
export class ModalPopUpComponent implements OnInit {
  @ViewChild('addnode') addNode: ElementRef; // keep the name of the veiw child is case senstitive lower case
  @ViewChild('addservice') addService : ElementRef;
  @ViewChild('removenode') removeNode : ElementRef;
  @ViewChild('removeservice') removeService : ElementRef;

  requirementRow: any;
  providesRow : any;
  portsRow: any;
  removeIdList : any[];

  modal : any = {
    protocol: '',
    address: '',
    port: 0
  } ;
  serviceObj: any = {
    service_management_info: {
      managed: true,
      manager_id: '',
      manager_type: "docker_swarm",
      max_instances: 1,
      mode: "replicated"
    },
    service_spec: {
      arguments: [
        "nginx-debug",
        "-g",
        "daemon off;"
      ],
      environment_variables: [
        "FOO=BAR"
      ],
      image: "nginx",
      image_version: "latest",
      name: "",
      privileged: false,
      provides: [
        {
          name: "http_server",
          unit: "description",
          value: "nginx"
        }
      ],
      public_ports: [
      ],
      required_networks: [
        "my_network"
      ],
      requires: [
        {
          name: "memory",
          unit: "MB",
          value: "1024"
        },
        {
          name: "cpu_share",
          unit: "ns",
          value: "1000000"
        }
      ]
    }
  } ;

  constructor(private toolbarService: ToolbarService,
              private ref: ChangeDetectorRef) {
    this.removeIdList = []
    this.toolbarService.remove.subscribe(data => {
      this.removeIdList = data;
    },
      err => {},
      () => {this.ref.detectChanges()});
  }

  ngOnInit() {
  }
  submitForm(form: any) {
    debugger;
    switch (form) {
      case 'removeSerForm':
        this.toolbarService.removeSuccess.emit(this.removeIdList);
        break;
      case 'nodeForm':
        // create node end point
        debugger;
        let nodeObject = {
          endpoint : this.modal.protocol + '://' + this.modal.address + ':' + this.modal.port
        };
        this.toolbarService.save.emit(nodeObject);
        break;
      case 'serviceForm':
        this.toolbarService.save.emit(this.serviceObj);
        break;
      case 'removeNode':
        this.toolbarService.removeSuccess.emit(this.removeIdList);
        break;
    }
  }

  addNewRow(event){
    // adding a new row to the Servce form.
    if (event.target.parentElement.firstChild.id == 'requireProps') {
      this.requirementRow++;
    }
    let row = document.createElement('div');
    row.innerHTML = '<input class="form-control col-md-5" type="text" placeholder="Name" id="providesProps">\n' +
      '                <input class="form-control col-md-3" type="text" placeholder="Unit">\n' +
      '                <input class="form-control col-md-3" type="text" placeholder="Value">\n' +
      '                <button class="btn btn-light col-md-1 fa fa-minus-square" onclick= {this.parentElement.parentElement.removeChild(this.parentElement)}\n' +
      '                </button>';
    row.className = 'row';
    row.id = this.requirementRow;
    event.target.parentElement.parentElement.appendChild(row);

  }

}
