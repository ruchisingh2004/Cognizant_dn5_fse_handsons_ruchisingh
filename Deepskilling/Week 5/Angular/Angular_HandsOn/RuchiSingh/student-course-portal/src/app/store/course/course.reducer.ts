import { createReducer, on } from '@ngrx/store';
import { Course } from '../../models/course.model';
import * as CourseActions from './course.actions';

export interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

export const initialState: CourseState = {
  courses: [],
  loading: false,
  error: null
};

export const courseReducer = createReducer(

  initialState,

  // LOAD
  on(CourseActions.loadCourses, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CourseActions.loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
    loading: false,
    error: null
  })),

  on(CourseActions.loadCoursesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // ADD
  on(CourseActions.addCourseSuccess, (state, { course }) => ({
    ...state,
    courses: [...state.courses, course]
  })),

  on(CourseActions.addCourseFailure, (state, { error }) => ({
    ...state,
    error
  })),

  // UPDATE
  on(CourseActions.updateCourseSuccess, (state, { course }) => ({
    ...state,
    courses: state.courses.map((existingCourse) =>
      existingCourse.id === course.id ? course : existingCourse
    )
  })),

  on(CourseActions.updateCourseFailure, (state, { error }) => ({
    ...state,
    error
  })),

  // DELETE
  on(CourseActions.deleteCourseSuccess, (state, { id }) => ({
    ...state,
    courses: state.courses.filter((course) => course.id !== id)
  })),

  on(CourseActions.deleteCourseFailure, (state, { error }) => ({
    ...state,
    error
  }))
);