import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { CourseService } from '../../services/course';
import * as CourseActions from './course.actions';

@Injectable()
export class CourseEffects {

  private actions$ = inject(Actions);
  private courseService = inject(CourseService);

  // LOAD COURSES
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadCourses),

      mergeMap(() =>
        this.courseService.getCourses().pipe(

          map((courses) =>
            CourseActions.loadCoursesSuccess({ courses })
          ),

          catchError((error) =>
            of(
              CourseActions.loadCoursesFailure({
                error: error.message
              })
            )
          )

        )
      )
    )
  );

  // ADD COURSE
  addCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.addCourse),

      mergeMap(({ course }) =>
        this.courseService.addCourse(course).pipe(

          map((newCourse) =>
            CourseActions.addCourseSuccess({
              course: newCourse
            })
          ),

          catchError((error) =>
            of(
              CourseActions.addCourseFailure({
                error: error.message
              })
            )
          )

        )
      )
    )
  );

  // UPDATE COURSE
  updateCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.updateCourse),

      mergeMap(({ course }) =>
        this.courseService.updateCourse(
          course.id,
          course
        ).pipe(

          map((updatedCourse) =>
            CourseActions.updateCourseSuccess({
              course: updatedCourse
            })
          ),

          catchError((error) =>
            of(
              CourseActions.updateCourseFailure({
                error: error.message
              })
            )
          )

        )
      )
    )
  );

  // DELETE COURSE
  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.deleteCourse),

      mergeMap(({ id }) =>
        this.courseService.deleteCourse(id).pipe(

          map(() =>
            CourseActions.deleteCourseSuccess({ id })
          ),

          catchError((error) =>
            of(
              CourseActions.deleteCourseFailure({
                error: error.message
              })
            )
          )

        )
      )
    )
  );
}