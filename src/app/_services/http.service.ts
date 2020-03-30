import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LoginDTO} from "../_models/dto/dtoEntities";
import { Observable } from 'rxjs';
import { CourseParticipation, Student, SkiTeacher, GroupParticipation, Course } from '../_models/entities';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  login(loginDto: LoginDTO) {
    return this.http.post(environment.api + '/auth/login', loginDto);
  }

  register(loginDto: LoginDTO) {
    return this.http.post(environment.api + '/auth/register', loginDto);
  }

  createStudent(student: Student) {
    return this.http.post(environment.api + '/auth/createStudent', student);
  }


  addChildrenToGroup(studentId: number, groupId: number) {

    const params = new HttpParams()
        .set("studentId", studentId.toLocaleString())
        .set("courseId", groupId.toLocaleString());

    return this.http.post(environment.api + '/app/addChildrenToGroup',null,{params})

  }

  evaluateChild(id: number, bewertung: string){
    const params = new HttpParams()
        .set("participation", id.toLocaleString())
        .set("bewertung", bewertung.toLocaleString());

    return this.http.post(environment.api + '/app/evaluateChild',null,{params})

  }

  addSkiTeacher(teacher: SkiTeacher){
    return this.http.post(environment.api + '/auth/createTeacher', teacher);
  }

  createTeacher() {
    return this.http.post(environment.api + '/auth/addSkiTeacher', null);
  }

  registerContactPerson() {
    return this.http.post(environment.api + '/auth/registerContactPerson', null);
  }

  assignCourse() {
    return this.http.post(environment.api + '/app/assignCourse', null);
  }

  createGroup(courseId: number) {
    const params = new HttpParams();
    params.set("courseId", courseId.toLocaleString());

    return this.http.post(environment.api + '/app/createGroup', null, {params});
  }

  addTeacherToGroup(skiTeacherId: number, groupId: number) {

    const params = new HttpParams();
    params.set("skiTeacherId", skiTeacherId.toLocaleString());
    params.set("groupId", groupId.toLocaleString())

    return this.http.post(environment.api + '/app/addTeacherToGroup', null, {params});
  }

  getAllGroups(courseId: number) {

    const params = new HttpParams();
    params.set("courseId", courseId.toLocaleString());

    return this.http.get(environment.api + '/app/getAllGroups', {params});
  }

  getAllMembers(courseId: number) {

    const params = new HttpParams();
    params.set("courseId", courseId.toLocaleString());

    return this.http.get(environment.api + '/app/getAllMembers', {params})
  }

  getSkiTeachers() {

    return this.http.get(environment.api + '/app/getSkiTeachers')
  }

  addChildrenToCourse(studentId: number, courseId: number) {

    const params = new HttpParams()
      .set("studentId", studentId.toLocaleString())
      .set("courseId", courseId.toLocaleString());

    return this.http.post(environment.api + '/app/addChildrenToCourse',null,{params})

  }

  registerChildren() {

    return this.http.post(environment.api + '/app/registerChildren', null);
  }

  getGroupParticipations(groupId: number) {

    const params = new HttpParams()
      .set("groupId", groupId.toLocaleString());

    return this.http.get(environment.api + '/app/getGroupParticipations', {params});
  }

  getCourseParticipants(proficiency: string, courseId: number) {

    const params = new HttpParams()
        .set("proficiency", proficiency)
        .set("courseId", courseId.toLocaleString());

    return this.http.get(environment.api + '/app/getCourseParticipants', {params})
  }

  getGroup(courseId: number) {
    let params = new HttpParams().set("courseId", courseId.toString());
    return this.http.get(environment.api + '/app/getGroup', {params});
  }

  getCourse(courseId: number) {

    return this.http.get(environment.api + '/get/getCourse/' + courseId.toLocaleString());
  }

  getCurrentCourse() {
    return this.http.get(environment.api + '/app/getCurrentCourse');
  }

  getChild(studentId: number) {
    return this.http.get(environment.api + '/app/getChild/' + studentId.toLocaleString())
  }

  getContactPerson(studentId: number) {
    let params = new HttpParams().set("studentId", studentId.toLocaleString());
    return this.http.get(environment.api + '/app/getContactPerson', {params})
  }

  enterResults(id: number, time: string){
    const params = new HttpParams()
        .set("id", id.toLocaleString())
        .set("time", time.toLocaleString());
    return this.http.post(environment.api + '/app/enterResults', {params});
  }

  getChildrenFromContactperson(id: number){
    return this.http.get(environment.api + '/app/getChildrenFromContactperson/' + id.toLocaleString())
  }

  enterRacetimes(id: number, time: string){
    const params = new HttpParams()
        .set("id", id.toLocaleString())
        .set("time", time.toLocaleString());
    return this.http.post(environment.api + '/app/enterRacetimes/', {params})
  }

  createCourse(course: Course){
    return this.http.post(environment.api + '/app/createCourse/', course)
  }


}
