import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {GroupComponent} from './dashboard/group/group.component';
import {RatingComponent} from './dashboard/rating/rating.component';
import {RaceComponent} from './dashboard/race/race.component';
import {AdminComponent} from './dashboard/admin/admin.component';
import {ErrorComponent} from './error/error.component';
import {OverviewComponent} from './dashboard/admin/overview/overview.component';
import {DashboardHomeComponent} from './dashboard/dashboard-home/dashboard-home.component';
import {StudentSelectionComponent} from './dashboard/group/student-selection/student-selection.component';
import {StudentDetailComponent} from './dashboard/group/student-detail/student-detail.component';
import {AuthGuard} from './_guards/auth.guard';
import {Enums} from './_models/enums';
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


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'error', component: ErrorComponent},
  { path: 'dashboard', component: DashboardComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: DashboardHomeComponent, children:[
              {path: 'myKids', component: MyKidsComponent},
              {path: 'enterResults', component: EnterResultsComponent}
      ]},
      { path: 'group', canActivate: [AuthGuard], data: {
        roles: [Enums.ADMIN, Enums.INSTRUCTOR, Enums.RACE]
        }, children: [
              {path: '', component: GroupComponent},
              {path: 'studentDetail', component: StudentDetailComponent},
              {path: 'studentSelection', component: StudentSelectionComponent}
          ]},
      { path: 'rating', component: RatingComponent, canActivate: [AuthGuard], data: {
        roles: [Enums.ADMIN, Enums.INSTRUCTOR, Enums.RACE]
        }, },
      { path: 'race', component: RaceComponent, canActivate: [AuthGuard], data: {
        roles: [Enums.ADMIN, Enums.INSTRUCTOR, Enums.RACE]
        }, },
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: {
          roles: [Enums.ADMIN, Enums.INSTRUCTOR, Enums.RACE]
          }, children: [
              { path: '', redirectTo: 'overview', pathMatch: 'full'},
              { path: 'overview', component: OverviewComponent},
              { path: 'checkAnwesend', component: CheckAnwesendComponent},
              { path: 'createTeacher', component: CreateTeacherComponent},
              { path: 'enterRacetimes', component: EnterRacetimesComponent},
              { path: 'newCourse', component: NewCourseComponent},
              { path: 'addGroup', component: AddGroupComponent},
              { path: 'addTeacher', component: AddTeacherComponent},
              { path: 'createGroup', component: CreateGroupComponent}
              // { path: 'settings', component: AdminSettingsComponent},
          ]}
      ]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
