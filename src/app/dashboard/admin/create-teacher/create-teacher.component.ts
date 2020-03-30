import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../_services/authentication.service';
import {LoginDTO} from '../../../_models/dto/dtoEntities';
import {Enums} from '../../../_models/enums';
import {HttpService} from '../../../_services/http.service';
import {CurrentUser, CustomResponse, SkiTeacher} from '../../../_models/entities';
import {ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {ToastService} from '../../../_services/toast.service';

@Component({
  selector: 'app-create-teacher',
  templateUrl: './create-teacher.component.html',
  styleUrls: ['./create-teacher.component.scss'],
})
export class CreateTeacherComponent implements OnInit {

  form: FormGroup;
    REGEX_USERNAME = new RegExp(/^[a-z]\.([a-z]+)+$/);

    constructor(private authenticationService: AuthenticationService,
                private httpService: HttpService,
                private router: Router,
                private toastService: ToastService,
                fb: FormBuilder) {

        this.form = fb.group({
            username:
                ['', [Validators.required]],

            firstname:
                ['', [Validators.required]],

            lastname:
                ['', [Validators.required]],

            email:
                ['', [Validators.required]],

            password:
                ['', [Validators.required]]
        });
    }

    ngOnInit() {}

    onSubmit() {
        const val = this.form.value;

        const teacher = new SkiTeacher;

        teacher.firstName = val.firstname;
        teacher.lastName = val.lastname;
        teacher.email = val.email;

        this.httpService.addSkiTeacher(teacher).subscribe(data => {
            this.checkResponse(data);
        });

        const loginDto = new LoginDTO(val.username, val.password, Enums.SKITEACHER);

        this.httpService.register(loginDto).subscribe(data => {
            this.checkResponse(data);
        });

    }


    checkResponse(data: any) {

        const response: CustomResponse = new CustomResponse();

        Object.assign(response, data);

        switch (response.typ) {
            case 'hint':
                this.toastService.presentHintToast(response.message);
                this.form.reset();
                break;
            case 'data':
                console.log("teacher added");
                break;
        }
    }

}
