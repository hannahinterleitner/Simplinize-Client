import {Component, OnInit} from '@angular/core';
import {DataService} from '../../../_services/data.service';
import {ModalController, ActionSheetController} from '@ionic/angular';
import {StudentSelectionComponent} from '../../group/student-selection/student-selection.component';
import {Router, NavigationExtras} from '@angular/router';
import {CurrentUser, CustomResponse, Student, CourseParticipation} from '../../../_models/entities';
import {HttpService} from '../../../_services/http.service';
import {ToastService} from '../../../_services/toast.service';
import {GroupParticipation} from '../../../_models/entities'; 
import { Proficiency } from 'src/app/_models/enums';

@Component({
  selector: 'app-enter-results',
  templateUrl: './enter-results.component.html',
  styleUrls: ['./enter-results.component.scss'],
})
export class EnterResultsComponent implements OnInit {

  coursePartdef: CourseParticipation [];
  coursePartgelb: CourseParticipation [];
  coursePartgruen: CourseParticipation [];
  coursePartlila: CourseParticipation [];
  coursePartorange: CourseParticipation [];

  constructor(private dataService: DataService,
    private toastService: ToastService,
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private router: Router,
    private http: HttpService) {
}

ngOnInit() {
  this.http.getCourseParticipants(Proficiency.DEFAULT, this.dataService.course.id).subscribe(res => this.checkResponseDefault(res));
  this.http.getCourseParticipants(Proficiency.GELB, this.dataService.course.id).subscribe(res => this.checkResponseGelb(res));
  this.http.getCourseParticipants(Proficiency.GRUEN, this.dataService.course.id).subscribe(res => this.checkResponseGruen(res));
  this.http.getCourseParticipants(Proficiency.LILA, this.dataService.course.id).subscribe(res => this.checkResponseLila(res));
  this.http.getCourseParticipants(Proficiency.ORANGE, this.dataService.course.id).subscribe(res => this.checkResponseOrange(res));
  }



speichern(id: number, time: string){
  this.http.enterResults(/*"this.coursePartgelb.id"*/2, time).subscribe(res => this.checkResponseSpeichern(res));
}

  checkResponseDefault(data: any) {

    const response: CustomResponse = new CustomResponse();
    
    Object.assign(response, data);
    
    switch (response.typ) {
    case 'hint':
        console.log(response.message)
        //this.toastService.presentHintToast(response.message);
        break;
    case 'data':
        console.log(response.data);
        this.coursePartdef = JSON.parse(JSON.stringify(response.data));
        break;
    }
    }

    checkResponseGelb(data: any) {

      const response: CustomResponse = new CustomResponse();
      
      Object.assign(response, data);
      
      switch (response.typ) {
      case 'hint':
          console.log(response.message)
          //this.toastService.presentHintToast(response.message);
          break;
      case 'data':
          console.log(response.data);
          this.coursePartgelb = JSON.parse(JSON.stringify(response.data));
          break;
      }
      }

      checkResponseGruen(data: any) {

        const response: CustomResponse = new CustomResponse();
        
        Object.assign(response, data);
        
        switch (response.typ) {
        case 'hint':
            console.log(response.message)
            //this.toastService.presentHintToast(response.message);
            break;
        case 'data':
            console.log(response.data);
            this.coursePartgruen = JSON.parse(JSON.stringify(response.data));
            break;
        }
        }

        checkResponseLila(data: any) {

          const response: CustomResponse = new CustomResponse();
          
          Object.assign(response, data);
          
          switch (response.typ) {
          case 'hint':
              console.log(response.message)
              //this.toastService.presentHintToast(response.message);
              break;
          case 'data':
              console.log(response.data);
              this.coursePartlila = JSON.parse(JSON.stringify(response.data));
              break;
          }
          }

          checkResponseOrange(data: any) {

            const response: CustomResponse = new CustomResponse();
            
            Object.assign(response, data);
            
            switch (response.typ) {
            case 'hint':
                console.log(response.message)
                //this.toastService.presentHintToast(response.message);
                break;
            case 'data':
                console.log(response.data);
                this.coursePartorange = JSON.parse(JSON.stringify(response.data));
                break;
            }
            }

            checkResponseSpeichern(data: any) {

              const response: CustomResponse = new CustomResponse();
              
              Object.assign(response, data);
              
              switch (response.typ) {
              case 'hint':
                  console.log(response.message)
                  //this.toastService.presentHintToast(response.message);
                  break;
              case 'data':
                  console.log(response.data);
                  break;
              }
              }


}
