import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Course } from '../models/course.model';
import { CourseService } from './course';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private enrolledCourseIds: string[] = [];

  constructor(private courseService: CourseService) {}

  enroll(courseId: string): void {
    if (!this.enrolledCourseIds.includes(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: string): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter(
      id => id !== courseId
    );
  }

  isEnrolled(courseId: string): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourses(): Observable<Course[]> {
    return this.courseService.getCourses().pipe(
      map(courses =>
        courses.filter(course =>
          this.enrolledCourseIds.includes(course.id)
        )
      )
    );
  }
}
