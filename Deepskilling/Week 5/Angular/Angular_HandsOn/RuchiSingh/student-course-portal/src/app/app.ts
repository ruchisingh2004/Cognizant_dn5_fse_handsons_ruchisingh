import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { StudentRegistration } from './pages/student-registration/student-registration';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Header,
    StudentRegistration
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}