import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthenticationService} from '../_services/authentication.service';
import {LoginDTO} from '../_models/dto/dtoEntities';
import {Enums} from '../_models/enums';
import {HttpService} from '../_services/http.service';
import {CurrentUser, CustomResponse} from '../_models/entities';
import {ToastController} from '@ionic/angular';
import {Router} from '@angular/router';
import {ToastService} from '../_services/toast.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    REGEX_USERNAME = new RegExp(/^[a-z]\.([a-z]+)+$/);

    constructor(private authenticationService: AuthenticationService,
                private httpService: HttpService,
                private router: Router,
                private toastService: ToastService,
                fb: FormBuilder) {

        if (this.authenticationService.getUser()) {
            this.router.navigate(['/dashboard']);
        }

        this.form = fb.group({
            username:
                ['', [Validators.required]],

            password:
                ['', [Validators.required]]
        });
    }

    ngOnInit() {}

    onSubmit() {
        const val = this.form.value;

        const loginDto = new LoginDTO(val.username, val.password, Enums.SKITEACHER);

        this.httpService.login(loginDto).subscribe(data => {
            this.checkResponse(data);
        });

    }

    register(username: string, password: string) {
        const val = this.form.value;

        const loginDto = new LoginDTO(username, password, Enums.CONTACTPERSON);

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
                const currentUser: CurrentUser = JSON.parse(JSON.stringify(response.data[0]));
                this.authenticationService.setUser(currentUser);
                this.router.navigate(['dashboard/home']);
                break;
        }
    }

    // Button mit NeedAcccount --> Pop UP mit Bitte bei SkiInstuctor oder Admin melden!
}
