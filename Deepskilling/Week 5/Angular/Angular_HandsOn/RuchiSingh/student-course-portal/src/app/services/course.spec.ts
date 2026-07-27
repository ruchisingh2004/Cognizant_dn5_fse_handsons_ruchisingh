import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { CourseService } from './course';
import { Course } from '../models/course.model';

describe('CourseService', () => {

  let service: CourseService;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:3000/courses';

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

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        CourseService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  afterEach(() => {
    httpMock.verify();
  });


  // TEST 1
  it('should be created', () => {

    expect(service).toBeTruthy();

  });


  // TEST 2
  it('should get courses', () => {

    service.getCourses().subscribe(courses => {

      expect(courses).toEqual(mockCourses);
      expect(courses.length).toBe(2);

    });

    const req = httpMock.expectOne(apiUrl);

    expect(req.request.method).toBe('GET');

    req.flush(mockCourses);

  });


  // TEST 3
  it('should handle HTTP error', () => {

    service.getCourses().subscribe({

      next: () => {
        throw new Error('Expected an error');
      },

      error: (error) => {
        expect(error).toBeTruthy();
      }

    });


    // First HTTP request
    const firstRequest = httpMock.expectOne(apiUrl);

    expect(firstRequest.request.method).toBe('GET');

    firstRequest.flush(
      { message: 'Server Error' },
      {
        status: 500,
        statusText: 'Internal Server Error'
      }
    );


    // Handle retry request(s)
    const retryRequests = httpMock.match(apiUrl);

    retryRequests.forEach(request => {

      expect(request.request.method).toBe('GET');

      request.flush(
        { message: 'Server Error' },
        {
          status: 500,
          statusText: 'Internal Server Error'
        }
      );

    });


    // Handle another retry if service uses retry(2)
    const remainingRequests = httpMock.match(apiUrl);

    remainingRequests.forEach(request => {

      request.flush(
        { message: 'Server Error' },
        {
          status: 500,
          statusText: 'Internal Server Error'
        }
      );

    });

  });

});
