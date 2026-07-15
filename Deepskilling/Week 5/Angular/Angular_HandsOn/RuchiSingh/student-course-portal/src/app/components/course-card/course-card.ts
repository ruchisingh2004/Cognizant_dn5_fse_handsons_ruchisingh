import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-card',
  imports: [],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard implements OnInit {

  @Input() title = '';
  @Input() instructor = '';
  @Input() duration = '';

  @Output() enroll = new EventEmitter<string>();

  ngOnInit(): void {
    console.log('Course Card Loaded:', this.title);
  }

  enrollCourse() {
    this.enroll.emit(this.title);
  }
}