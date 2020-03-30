import {Proficiency} from './enums';

export class CurrentUser {
    constructor(
        public id: number,
        public credentials: string,
        public firstName: string,
        public lastName: string,
        public token: string
    ) {}
}

export class CustomResponse {
    constructor(
        public typ?: string,
        public resource?: string,
        public message?: string,
        public data?: object[]
    ) {}
}

export class SkiTeacher {
    constructor(
        public id: number = 0,
        public firstName: string = '',
        public lastName: string = '',
        public email: string = ''
    ) {}
}

export class ContactPerson {
    constructor(
        public id: number = 0,
        public firstName: string = '',
        public lastName: string = '',
        public email: string = '',
        public phone: string = ''
    ) {}
}

export class Student {
    constructor(
        public id: number = 0,
        public firstName: string = '',
        public lastName: string = '',
        public birthday: Date = new Date(),
        public postCode: number = 0,
        public place: string = '',
        public houseNumber: string = '',
        public street: string = '',
        public gender: string = ''
    ) {}
}


export class Group {
    constructor(
        public id: number = 0,
        public participants: number = 0,
        public startTime: string = '',
        public proficiency: Proficiency = Proficiency.DEFAULT
    ) {}
}

export class GroupParticipation {
    constructor(
        public id: number = 0,
        public rank: number = 0,
        public time: number = 0,
        public drivingCan: number = 0,
        public student: Student = new Student()
    ) {}
}

export class Course {
    constructor(
        public id: number = 0,
        public from: Date = new Date(),
        public to: Date = new Date(),
        public assigned: Date = new Date(),
        public place: string = '',
        public instructor: SkiTeacher = new SkiTeacher()
    ) {}
}

export class CourseParticipation {
    constructor(
        public id: number = 0,
        public drivingCanFromRegistration: string,
        public proficiency: Proficiency = Proficiency.DEFAULT,
        public student: Student = new Student()
    ) {}
}

