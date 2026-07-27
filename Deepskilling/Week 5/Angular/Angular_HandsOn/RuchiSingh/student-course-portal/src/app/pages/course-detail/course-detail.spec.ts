import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CourseDetail } from './course-detail';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';

describe('CourseDetail', () => {

  let component: CourseDetail;
  let fixture: ComponentFixture<CourseDetail>;

  const mockCourse: Course = {
    id: '1',
    name: 'Angular',
    code: 'ANG101',
    credits: 4,
    gradeStatus: 'passed'
  };

  const mockCourseService = {
    getCourseById: (id: string) => of(mockCourse)
  };

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => {
          return key === 'id' ? '1' : null;
        }
      }
    }
  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [CourseDetail],

      providers: [
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute
        },
        {
          provide: CourseService,
          useValue: mockCourseService
        }
      ]

    }).compileComponents();

    fixture = TestBed.createComponent(CourseDetail);
    component = fixture.componentInstance;

    fixture.detectChanges();

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load course using route id', () => {
    expect(component.course).toEqual(mockCourse);
  });

});