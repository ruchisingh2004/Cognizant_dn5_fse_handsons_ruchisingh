import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-card',
  standalone: true,
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
    console.log('Course Loaded:', this.title);
  }

  enrollCourse() {
    this.enroll.emit(this.title);
  }

}