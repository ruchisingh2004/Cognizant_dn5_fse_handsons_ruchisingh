import { Component } from '@angular/core';
import { CourseCard } from '../../components/course-card/course-card';

@Component({
  selector: 'app-home',
  imports: [CourseCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  onEnroll(course: string) {
    alert('Enrolled in ' + course);
  }
}