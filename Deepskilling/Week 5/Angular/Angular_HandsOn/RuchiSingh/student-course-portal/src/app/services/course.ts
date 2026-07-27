import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Observable,
  catchError,
  map,
  retry,
  switchMap,
  tap,
  throwError
} from 'rxjs';

import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) {}

  // GET ALL COURSES
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      retry(2),

      map(courses => courses),

      tap(courses => {
        console.log('Courses fetched:', courses);
      }),

      catchError(error => {
        console.error('Error fetching courses after retries:', error);
        return throwError(() => error);
      })
    );
  }

  // GET COURSE BY ID
  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      retry(2),

      tap(course => {
        console.log('Course fetched:', course);
      }),

      catchError(error => {
        console.error('Error fetching course:', error);
        return throwError(() => error);
      })
    );
  }

  // ADD COURSE
  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      tap(newCourse => {
        console.log('Course added:', newCourse);
      }),

      catchError(error => {
        console.error('Error adding course:', error);
        return throwError(() => error);
      })
    );
  }

  // UPDATE COURSE
  updateCourse(id: string, course: Course): Observable<Course> {
    return this.http.put<Course>(
      `${this.apiUrl}/${id}`,
      course
    ).pipe(
      tap(updatedCourse => {
        console.log('Course updated:', updatedCourse);
      }),

      catchError(error => {
        console.error('Error updating course:', error);
        return throwError(() => error);
      })
    );
  }

  // UPDATE COURSE AND FETCH UPDATED COURSE
  updateAndFetchCourse(
    id: string,
    course: Course
  ): Observable<Course> {

    return this.updateCourse(id, course).pipe(
      switchMap(() => this.getCourseById(id)),

      tap(updatedCourse => {
        console.log('Updated course fetched:', updatedCourse);
      }),

      catchError(error => {
        console.error('Error updating and fetching course:', error);
        return throwError(() => error);
      })
    );
  }

  // DELETE COURSE
  deleteCourse(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`
    ).pipe(
      tap(() => {
        console.log('Course deleted:', id);
      }),

      catchError(error => {
        console.error('Error deleting course:', error);
        return throwError(() => error);
      })
    );
  }
}