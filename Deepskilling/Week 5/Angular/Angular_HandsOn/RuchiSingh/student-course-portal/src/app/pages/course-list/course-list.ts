import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Course } from '../../models/course.model';

import * as CourseActions from '../../store/course/course.actions';

import {
  selectAllCourses,
  selectCoursesLoading,
  selectCoursesError
} from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {

  courses$: Observable<Course[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.courses$ = this.store.select(selectAllCourses);
    this.loading$ = this.store.select(selectCoursesLoading);
    this.error$ = this.store.select(selectCoursesError);
  }

  ngOnInit(): void {
    console.log('CourseList loaded using NgRx');

    this.store.dispatch(
      CourseActions.loadCourses()
    );
  }

  // ADD
  addTestCourse(): void {

    const newCourse: Course = {
      id: '',
      name: 'TypeScript',
      code: 'TS107',
      credits: 3,
      gradeStatus: 'pending'
    };

    this.store.dispatch(
      CourseActions.addCourse({
        course: newCourse
      })
    );
  }

  // UPDATE
  updateTestCourse(course: Course): void {

    const updatedCourse: Course = {
      ...course,
      name: course.name.includes('Updated')
        ? course.name
        : course.name + ' Updated',
      credits: 5,
      gradeStatus: 'passed'
    };

    this.store.dispatch(
      CourseActions.updateCourse({
        course: updatedCourse
      })
    );
  }

  // DELETE
  deleteCourse(id: string): void {

    this.store.dispatch(
      CourseActions.deleteCourse({
        id
      })
    );
  }
}