import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  createCourse(){
    this.router.navigate(['dashboard/admin/createCourse']);
  } 

  checkAnwesend(){
    this.router.navigate(['dashboard/admin/checkAnwesend']);
  } 

  enterRacetimes(){
    this.router.navigate(['dashboard/admin/enterRacetimes']);
  } 

  createTeacher(){
    this.router.navigate(['dashboard/admin/createTeacher']);
  } 

  addTeacher(){
    this.router.navigate(['dashboard/admin/addTeacher']);
  } 

  createGroup(){
    this.router.navigate(['dashboard/admin/createGroup']);
  } 

  addGroup(){
    this.router.navigate(['dashboard/admin/addGroup']);
  } 
}
