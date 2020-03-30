import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../../../_services/http.service';
import {ContactPerson, CustomResponse, GroupParticipation, Student} from '../../../_models/entities';
import {ToastService} from '../../../_services/toast.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
})
export class StudentDetailComponent implements OnInit {

  student: Student;
  contactPersons: ContactPerson [] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private httpService: HttpService,
              private toastService: ToastService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.student = this.router.getCurrentNavigation().extras.state.student;
      }
    });
  }

  ngOnInit() {
    this.httpService.getContactPerson(this.student.id).subscribe(res => this.checkResponse(res));
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
        this.contactPersons = JSON.parse(JSON.stringify(response.data));
        break;
    }
  }
}
