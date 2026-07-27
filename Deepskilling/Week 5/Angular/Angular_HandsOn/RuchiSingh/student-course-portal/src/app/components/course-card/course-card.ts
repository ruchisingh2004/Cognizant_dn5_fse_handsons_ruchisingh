import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard implements OnInit, OnChanges {

  // Old HOL inputs - keep these
  @Input() title = '';
  @Input() instructor = '';
  @Input() duration = '';

  // HOL 10 input
  @Input() course!: Course;

  // Old HOL output - keep this
  @Output() enroll = new EventEmitter<string>();

  // HOL 10 output
  @Output() enrollRequested = new EventEmitter<string>();

  ngOnInit(): void {
    console.log('Course Loaded:', this.course ?? this.title);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Course changed:', changes['course']);
  }

  enrollCourse(): void {

    // HOL 10
    if (this.course) {
      this.enrollRequested.emit(this.course.id);
      return;
    }

    // Older HOL
    this.enroll.emit(this.title);
  }
}