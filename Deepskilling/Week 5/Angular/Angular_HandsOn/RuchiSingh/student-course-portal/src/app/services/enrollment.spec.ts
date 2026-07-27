import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { EnrollmentService } from './enrollment';
import { CourseService } from './course';
import { Course } from '../models/course.model';

describe('EnrollmentService', () => {

  let service: EnrollmentService;

  const mockCourses: Course[] = [
    {
      id: '1',
      name: 'Angular',
      code: 'ANG101',
      credits: 4,
      gradeStatus: 'passed'
    },
    {
      id: '2',
      name: 'React',
      code: 'RCT102',
      credits: 3,
      gradeStatus: 'pending'
    }
  ];

  const mockCourseService = {
    getCourses: () => of(mockCourses)
  };

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        EnrollmentService,
        {
          provide: CourseService,
          useValue: mockCourseService
        }
      ]
    });

    service = TestBed.inject(EnrollmentService);
  });


  // TEST 1
  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  // TEST 2
  it('should enroll a course', () => {

    service.enroll('1');

    expect(service.isEnrolled('1'))
      .toBe(true);
  });


  // TEST 3
  it('should unenroll a course', () => {

    service.enroll('1');

    service.unenroll('1');

    expect(service.isEnrolled('1'))
      .toBe(false);
  });


  // TEST 4
  it('should return enrolled courses', () => {

    service.enroll('1');

    service.getEnrolledCourses()
      .subscribe(courses => {

        expect(courses.length).toBe(1);

        expect(courses[0].id)
          .toBe('1');

        expect(courses[0].name)
          .toBe('Angular');
      });

  });

});