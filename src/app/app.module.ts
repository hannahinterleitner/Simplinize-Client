import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AdminComponent} from './dashboard/admin/admin.component';
import {GroupComponent} from './dashboard/group/group.component';
import {RaceComponent} from './dashboard/race/race.component';
import {RatingComponent} from './dashboard/rating/rating.component';
import {ErrorComponent} from './error/error.component';
import {DashboardHomeComponent} from './dashboard/dashboard-home/dashboard-home.component';
import {OverviewComponent} from './dashboard/admin/overview/overview.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ErrorInterceptor} from './_helpers/error.interceptor';
import {HttpService} from './_services/http.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JwtInterceptor} from './_helpers/jwt.interceptor';
import {StudentSelectionComponent} from './dashboard/group/student-selection/student-selection.component';
import {StudentDetailComponent} from './dashboard/group/student-detail/student-detail.component';
import {RatingDetailComponent} from './dashboard/rating/rating-detail/rating-detail.component';
import {SettingsComponent} from './dashboard/dashboard-home/settings/settings.component';
import {MyKidsComponent} from './dashboard/dashboard-home/my-kids/my-kids.component';
import {EnterResultsComponent} from './dashboard/dashboard-home/enter-results/enter-results.component';
import {CheckAnwesendComponent} from './dashboard/admin/check-anwesend/check-anwesend.component';
import {CreateTeacherComponent} from './dashboard/admin/create-teacher/create-teacher.component';
import {EnterRacetimesComponent} from './dashboard/admin/enter-racetimes/enter-racetimes.component';
import {NewCourseComponent} from './dashboard/admin/new-course/new-course.component';
import {AddTeacherComponent} from './dashboard/admin/add-teacher/add-teacher.component';
import {CreateGroupComponent} from './dashboard/admin/create-group/create-group.component';
import {AddGroupComponent} from './dashboard/admin/add-group/add-group.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ErrorComponent,
        DashboardComponent,
        AdminComponent,
        GroupComponent,
        StudentSelectionComponent,
        StudentDetailComponent,
        RaceComponent,
        SettingsComponent,
        RatingComponent,
        RatingDetailComponent,
        DashboardHomeComponent,
        OverviewComponent,
        MyKidsComponent,
        CheckAnwesendComponent,
        EnterRacetimesComponent,
        CreateTeacherComponent,
        EnterResultsComponent,
        NewCourseComponent,
        AddTeacherComponent,
        CreateGroupComponent,
        AddGroupComponent
    ],
    entryComponents: [StudentSelectionComponent, RatingDetailComponent],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
    exports: [],
    providers: [
        StatusBar,
        SplashScreen,
        InAppBrowser,
        HttpService,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}


    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
