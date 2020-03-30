import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../_services/authentication.service';
import {DataService} from '../../../_services/data.service';
import {LoginDTO} from '../../../_models/dto/dtoEntities';
import {Enums} from '../../../_models/enums';
import {HttpService} from '../../../_services/http.service';
import {CurrentUser, CustomResponse, Student, Course} from '../../../_models/entities';
import {ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {ToastService} from '../../../_services/toast.service';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.scss'],
})
export class NewCourseComponent implements OnInit {


form: FormGroup;
  REGEX_USERNAME = new RegExp(/^[a-z]\.([a-z]+)+$/);

  constructor(private authenticationService: AuthenticationService,
              private httpService: HttpService,
              private router: Router,
              private toastService: ToastService,
              private dataService: DataService,
              fb: FormBuilder) {

      if (this.authenticationService.getUser()) {
          this.router.navigate(['/dashboard']);
      }

      this.form = fb.group({
          from:
              ['', [Validators.required]],

              to:
              ['', [Validators.required]],

              assigned:
              ['', [Validators.required]],

              place:
              ['', [Validators.required]],

              instructor:
              ['', [Validators.required]]
      });
  }

  ngOnInit() {
  }

  onSubmit() {
      const val = this.form.value;

      const course = new Course(val.from, val.to, val.assigned, val.place, val.instructor);

      this.httpService.createCourse(course).subscribe(data => {
          this.checkResponseSubmit(data);
      });

  }


  checkResponseSubmit(data: any) {

      const response: CustomResponse = new CustomResponse();

      Object.assign(response, data);

      switch (response.typ) {
          case 'hint':
              this.toastService.presentHintToast(response.message);
              this.form.reset();
              break;
          case 'data':
              console.log("course created")
              break;
      }
  }

}
