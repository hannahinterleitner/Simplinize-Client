import {Component, OnInit} from '@angular/core';
import {DataService} from '../../../_services/data.service';
import {ModalController, ActionSheetController} from '@ionic/angular';
import {StudentSelectionComponent} from '../../group/student-selection/student-selection.component';
import {Router, NavigationExtras} from '@angular/router';
import {CurrentUser, CustomResponse, Student, Group, SkiTeacher} from '../../../_models/entities';
import {HttpService} from '../../../_services/http.service';
import {ToastService} from '../../../_services/toast.service';
import {GroupParticipation} from '../../../_models/entities';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss'],
})
export class AddTeacherComponent implements OnInit {

  groups: Group [];
  teacher: SkiTeacher [];

  constructor(private dataService: DataService,
    private toastService: ToastService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private router: Router,
    private http: HttpService) {
}

ngOnInit() {
  this.http.getAllGroups(this.dataService.course.id).subscribe(res => this.checkResponseGroup(res));
  this.http.getSkiTeachers().subscribe(res => this.checkResponseTeacher(res));
  }

speichern(gid: number, tid: number){
  this.http.addTeacherToGroup(tid, gid).subscribe(res => {});
}

checkResponseGroup(data: any) {

const response: CustomResponse = new CustomResponse();

Object.assign(response, data);

switch (response.typ) {
case 'hint':
    console.log(response.message)
    //this.toastService.presentHintToast(response.message);
    break;
case 'data':
    console.log(response.data);
    this.groups = JSON.parse(JSON.stringify(response.data));
    break;
}
}

checkResponseTeacher(data: any) {

  const response: CustomResponse = new CustomResponse();
  
  Object.assign(response, data);
  
  switch (response.typ) {
  case 'hint':
      console.log(response.message)
      //this.toastService.presentHintToast(response.message);
      break;
  case 'data':
      console.log(response.data);
      this.teacher = JSON.parse(JSON.stringify(response.data));
      break;
  }
  }

}
