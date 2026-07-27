import { Routes } from '@angular/router';

import { ReactiveEnrollmentFormComponent } from './pages/reactive-enrollment-form/reactive-enrollment-form';
import { CourseList } from './pages/course-list/course-list';
import { CourseDetail } from './pages/course-detail/course-detail';
import { StudentProfile } from './pages/student-profile/student-profile';
import { NotFound } from './pages/not-found/not-found';
import { CoursesLayout } from './pages/courses-layout/courses-layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full'
  },
  {
    path: 'courses',
    component: CoursesLayout,
    children: [
      {
        path: '',
        component: CourseList
      },
      {
        path: ':id',
        component: CourseDetail
      }
    ]
  },
  {
    path: 'profile',
    component: StudentProfile
  },
  {
    path: 'enroll-reactive',
    component: ReactiveEnrollmentFormComponent
  },
  {
    path: '**',
    component: NotFound
  }
];