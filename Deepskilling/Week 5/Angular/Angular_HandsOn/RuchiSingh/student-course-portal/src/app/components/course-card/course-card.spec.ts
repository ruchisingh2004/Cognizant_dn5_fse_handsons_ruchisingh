import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';
import { vi } from 'vitest';

import { CourseCard } from './course-card';
import { Course } from '../../models/course.model';

describe('CourseCard', () => {

  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;

  const mockCourse: Course = {
    id: '1',
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed'
  };

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [CourseCard]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;

    component.course = mockCourse;

    fixture.detectChanges();

    await fixture.whenStable();
  });

  // TEST 1 - Component creation
  it('should create', () => {
    expect(component).toBeTruthy();
  });


  // TEST 2 - @Input rendering
  it('should display course name', () => {

    component.course = mockCourse;

    fixture.detectChanges();

    const heading =
      fixture.debugElement.query(By.css('h3'));

    expect(heading.nativeElement.textContent)
      .toContain('Data Structures');
  });


  // TEST 3 - @Output event
  it('should emit course id when enroll button is clicked', () => {

    component.course = mockCourse;

    fixture.detectChanges();

    const emitSpy =
      vi.spyOn(component.enrollRequested, 'emit');

    const button =
      fixture.debugElement.query(By.css('button'));

    button.nativeElement.click();

    expect(emitSpy)
      .toHaveBeenCalledWith('1');
  });


  // TEST 4 - ngOnChanges
  it('should log when course changes', () => {

    const consoleSpy =
      vi.spyOn(console, 'log');

    component.ngOnChanges({
      course: new SimpleChange(
        null,
        mockCourse,
        true
      )
    });

    expect(consoleSpy)
      .toHaveBeenCalled();

    consoleSpy.mockRestore();
  });


  // TEST 5 - Course code rendering
  it('should display course code', () => {

    component.course = mockCourse;

    fixture.detectChanges();

    expect(fixture.nativeElement.textContent)
      .toContain('CS101');
  });

});