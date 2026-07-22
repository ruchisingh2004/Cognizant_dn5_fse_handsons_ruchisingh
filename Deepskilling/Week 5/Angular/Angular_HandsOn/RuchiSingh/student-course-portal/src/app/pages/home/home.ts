import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';

import { CourseService } from '../../services/course';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, CourseCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  // HOL 6: live number of courses from CourseService
  courseCount: number = 0;

  // Existing course data - keep this
  courses = [
    {
      title: 'Angular Fundamentals',
      instructor: 'John Smith',
      duration: '6 Weeks',
      fee: 5000,
      available: true
    },
    {
      title: 'React Essentials',
      instructor: 'Jane Doe',
      duration: '8 Weeks',
      fee: 6500,
      available: true
    },
    {
      title: 'Python Basics',
      instructor: 'David Miller',
      duration: '4 Weeks',
      fee: 4500,
      available: false
    }
  ];

  // Inject CourseService
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseCount = this.courseService.getCourses().length;
  }

  onEnroll(course: string): void {
    alert('Enrolled in ' + course);
  }

}