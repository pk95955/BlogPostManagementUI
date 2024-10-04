// src/app/components/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Reactive Forms
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoginForm } from '../Models/loginform.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Optional: For styling
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; // Initialize FormGroup without generics
  isSubmitted = false;  // Track form submission
  isSubmitting = false; // Track submission in progress
  hidePassword = true;  // Control password visibility
  errorMessage: string = ''; // Store error messages

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize the form with form controls and validators
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
    });
  }

  ngOnInit(): void {
    // Optionally, redirect to home if already logged in
    // this.authService.isLoggedIn.subscribe(status => {
    //   if (status) {
    //     this.router.navigate(['/']); // Navigate to home or dashboard
    //   }
    // });
  }

  // Getter for easy access to form controls
  get formControls() {
    return this.loginForm.controls;
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  // Handle form submission
  onSubmit() {
    this.isSubmitted = true;
    this.errorMessage = '';

    if (this.loginForm.invalid) {
      return; // Stop if form is invalid
    }

    this.isSubmitting = true; // Start submission

    const username: string = this.loginForm.get('username')?.value;
    const password: string = this.loginForm.get('password')?.value;

    this.authService.login(username, password).subscribe({
      next: (response) => {
        this.isSubmitting = false; // Stop submission
        this.router.navigate(['/postlist']); // Navigate to desired route
      },
      error: (error) => {
        this.isSubmitting = false; // Stop submission
        this.errorMessage = error; // Display error message
      }
    });
  }
}
