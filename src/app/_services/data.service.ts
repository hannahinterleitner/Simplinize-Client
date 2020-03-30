import { Injectable } from '@angular/core';
import {CurrentUser, CustomResponse, Group, GroupParticipation, Student, Course, CourseParticipation} from '../_models/entities';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  groupParticipations: GroupParticipation [] = [];
  courseParticipations: CourseParticipation [] = [];
  group: Group = new Group();
  course: Course = new Course();
}
