import {Component, OnInit} from '@angular/core';
import {DataService} from '../../_services/data.service';
import {ModalController, ActionSheetController} from '@ionic/angular';
import {StudentSelectionComponent} from './student-selection/student-selection.component';
import {Router, NavigationExtras} from '@angular/router';
import {CurrentUser, CustomResponse, Student} from '../../_models/entities';
import {HttpService} from '../../_services/http.service';
import {ToastService} from '../../_services/toast.service';

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {

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

    showModal() {
        this.presentModal();
    }

    openPopUp(selected: Student) {
        this.presentActionSheet(selected);
    }

    private async presentModal() {
        const modal = await this.modalController.create({
            component: StudentSelectionComponent
        });
        return await modal.present();
    }

    private async presentActionSheet(selected: Student) {
        const actionSheet = await this.actionSheetController.create({
            header: selected.firstName + " " + selected.lastName,
            buttons: [{
                text: 'View details',
                //icon: 'contact',
                handler: () => {
                    let navigationExtras: NavigationExtras = {
                        state: {
                            student: selected
                        }
                    };
                    this.router.navigate(['/dashboard/group/studentDetail'], navigationExtras);
                }
            }, {
                text: 'Abwesend',
                //icon: 'checkbox-outline',
                handler: () => {
                    console.log('Abwesend clicked');
                }
            }, {
                text: 'Remove from group',
                role: 'destructive',
                //icon: 'trash',
                handler: () => {
                    console.log('Delete clicked');
                }
            },
                {
                    text: 'Cancel',
                    //icon: 'close',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }]
        });
        await actionSheet.present();
    }

}
