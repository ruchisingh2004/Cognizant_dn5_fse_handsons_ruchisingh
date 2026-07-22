import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';


// ==========================================
// CUSTOM SYNCHRONOUS VALIDATOR
// Reject course codes starting with "XX"
// ==========================================
function noCourseCode(
  control: AbstractControl
): ValidationErrors | null {

  const value = control.value;

  if (value && value.toString().startsWith('XX')) {
    return { noCourseCode: true };
  }

  return null;
}


// ==========================================
// CUSTOM ASYNC VALIDATOR
// Email containing "test@" is considered taken
// ==========================================
function simulateEmailCheck(
  control: AbstractControl
): Promise<ValidationErrors | null> {

  return new Promise((resolve) => {

    setTimeout(() => {

      const email = control.value || '';

      if (email.includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }

    }, 800);

  });
}


@Component({
  selector: 'app-reactive-enrollment-form',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css'
})

export class ReactiveEnrollmentFormComponent implements OnInit {

  enrollForm!: FormGroup;

  constructor(private fb: FormBuilder) {}


  // ==========================================
  // CREATE REACTIVE FORM
  // ==========================================
  ngOnInit(): void {

    this.enrollForm = this.fb.group({

      studentName: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      studentEmail: this.fb.control(
        '',
        [
          Validators.required,
          Validators.email
        ],
        [
          simulateEmailCheck
        ]
      ),

      courseId: [
        '',
        [
          Validators.required,
          noCourseCode
        ]
      ],

      preferredSemester: [
        'Odd',
        Validators.required
      ],

      agreeToTerms: [
        false,
        Validators.requiredTrue
      ],

      // Dynamic FormArray
      additionalCourses:
        this.fb.array<FormControl<string | null>>([])

    });

  }


  // ==========================================
  // FORM ARRAY GETTER
  // ==========================================
  get additionalCourses():
    FormArray<FormControl<string | null>> {

    return this.enrollForm.get(
      'additionalCourses'
    ) as FormArray<FormControl<string | null>>;

  }


  // ==========================================
  // ADD COURSE
  // ==========================================
  addCourse(): void {

    const newCourse =
      new FormControl<string | null>(
        '',
        Validators.required
      );

    this.additionalCourses.push(newCourse);

  }


  // ==========================================
  // REMOVE COURSE
  // ==========================================
  removeCourse(index: number): void {

    this.additionalCourses.removeAt(index);

  }


  // ==========================================
  // SUBMIT FORM
  // ==========================================
  onSubmit(): void {

    if (this.enrollForm.valid) {

      console.log(
        'Form Value:',
        this.enrollForm.value
      );

      console.log(
        'Raw Value:',
        this.enrollForm.getRawValue()
      );

    }

  }

}