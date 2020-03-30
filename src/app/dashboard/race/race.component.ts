import {Component, OnInit} from '@angular/core';
import {DataService} from '../../_services/data.service';
import {ModalController, ActionSheetController} from '@ionic/angular';
import {StudentSelectionComponent} from '../group/student-selection/student-selection.component';
import {Router, NavigationExtras} from '@angular/router';
import {CurrentUser, CustomResponse, Student, Group} from '../../_models/entities';
import {HttpService} from '../../_services/http.service';
import {ToastService} from '../../_services/toast.service';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.scss'],
})
export class RaceComponent implements OnInit {

  private group: Group;

  constructor(private dataService: DataService,
    private toastService: ToastService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private router: Router,
    private http: HttpService) {
}

ngOnInit() {
this.http.getGroupParticipations(this.dataService.group.id).subscribe(res => this.checkResponse(res));
this.http.getGroup(this.dataService.group.id).subscribe(res => this.group);
}


checkResponse(data: any) {

const response: CustomResponse = new CustomResponse();

Object.assign(response, data);

switch (response.typ) {
case 'hint':
    console.log(response.message)
    //this.toastService.presentHintToast(response.message);
    break;
case 'data':
    console.log(response.data);
    this.dataService.groupParticipations = JSON.parse(JSON.stringify(response.data));
    break;
}
}


}

