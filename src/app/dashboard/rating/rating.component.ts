import {Component, OnInit} from '@angular/core';
import {DataService} from '../../_services/data.service';
import {ModalController, ActionSheetController} from '@ionic/angular';
import {StudentSelectionComponent} from '../group/student-selection/student-selection.component';
import {Router, NavigationExtras} from '@angular/router';
import {CurrentUser, CustomResponse, Student} from '../../_models/entities';
import {HttpService} from '../../_services/http.service';
import {ToastService} from '../../_services/toast.service';
import {GroupParticipation} from '../../_models/entities'; 

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {

  constructor(private dataService: DataService,
    private toastService: ToastService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private router: Router,
    private http: HttpService) {
}

ngOnInit() {
this.http.getGroupParticipations(this.dataService.group.id).subscribe(res => this.checkResponse(res));
}

speichern(studentid: number, bewertung: string){
  this.http.evaluateChild(studentid, bewertung).subscribe(res => this.checkResponse(res));
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
