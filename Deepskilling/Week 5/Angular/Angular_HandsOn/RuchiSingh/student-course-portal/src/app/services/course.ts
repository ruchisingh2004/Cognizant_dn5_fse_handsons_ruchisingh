import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courses: Course[] = [
    {
      id: 1,
      name: 'Angular',
      code: 'ANG101',
      credits: 4,
      gradeStatus: 'passed'
    },
    {
      id: 2,
      name: 'React',
      code: 'RCT102',
      credits: 3,
      gradeStatus: 'pending'
    },
    {
      id: 3,
      name: 'Java',
      code: 'JAVA103',
      credits: 4,
      gradeStatus: 'passed'
    },
    {
      id: 4,
      name: 'Database Management',
      code: 'DBMS104',
      credits: 3,
      gradeStatus: 'failed'
    },
    {
      id: 5,
      name: 'Cyber Security',
      code: 'CYB105',
      credits: 4,
      gradeStatus: 'pending'
    }
  ];

  constructor() {}

  getCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find(course => course.id === id);
  }

  addCourse(course: Course): void {
    this.courses.push(course);
  }
}