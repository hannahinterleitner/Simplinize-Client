import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../_services/authentication.service';
import {DataService} from '../../../_services/data.service';
import {LoginDTO} from '../../../_models/dto/dtoEntities';
import {Enums} from '../../../_models/enums';
import {HttpService} from '../../../_services/http.service';
import {CurrentUser, CustomResponse, Student} from '../../../_models/entities';
import {ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {ToastService} from '../../../_services/toast.service';


@Component({
  selector: 'app-my-kids',
  templateUrl: './my-kids.component.html',
  styleUrls: ['./my-kids.component.scss'],
})
export class MyKidsComponent implements OnInit {

    myKids: Student []
    kids: Student []

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
            firstname:
                ['', [Validators.required]],

                lastname:
                ['', [Validators.required]],

                date:
                ['', [Validators.required]],

                postcode:
                ['', [Validators.required]],

                place:
                ['', [Validators.required]],

                housenumber:
                ['', [Validators.required]],

                gender:
                ['', [Validators.required]],

            street:
                ['', [Validators.required]]
        });
    }

    ngOnInit() {
        this.httpService.getChildrenFromContactperson(this.authenticationService.getUser().id).subscribe(data => {
            this.checkResponseInit(data);
        });
    }

    onSubmit() {
        const val = this.form.value;

        const student = new Student(val.firstname, val.lastname, val.date, val.postcode, val.place, val.housenumber, val.street, val.gender);

        this.httpService.createStudent(student).subscribe(data => {
            this.checkResponseSubmit(data);
        });

    }

    registerChild(id: number){
        this.httpService.addChildrenToCourse(id, this.dataService.course.id).subscribe(data => {
            this.checkResponseRegister(data);
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
                console.log("student created")
                break;
        }
    }

    checkResponseInit(data: any) {

        const response: CustomResponse = new CustomResponse();

        Object.assign(response, data);

        switch (response.typ) {
            case 'hint':
                this.toastService.presentHintToast(response.message);
                this.form.reset();
                break;
            case 'data':
                for(let i in response.data){
                this.kids.push(JSON.parse(JSON.stringify(response.data[i])))
                }
                break;
        }
    }

    checkResponseRegister(data: any) {

        const response: CustomResponse = new CustomResponse();

        Object.assign(response, data);

        switch (response.typ) {
            case 'hint':
                this.toastService.presentHintToast(response.message);
                this.form.reset();
                break;
            case 'data':
                console.log("student registered")
                break;
        }
    }
  }
