// src/app/components/post-text/post-text.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService, PostRequest, PostResponse } from '../services/post.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-text',
  templateUrl: './post-text.component.html',
  styleUrls: ['./post-text.component.css']
})
export class PostTextComponent implements OnInit {
  postForm: FormGroup;
  isSubmitted = false;
  isSubmitting = false;
  errorMessage: string = '';
  successMessage: string = ''; 
  @Input() postTextInput : string ="";
  @Input() isEditFlag : boolean =false; 
  @Input() editid : number =-1; 
  @Output() editPostEvent = new EventEmitter<boolean>(); 

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private authService: AuthService,
    private router: Router
  ) {
    this.postForm = this.formBuilder.group({       
      content: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  ngOnInit(): void {
    this.postForm.patchValue({
      content: this.postTextInput
    });
    
    this.authService.isLoggedIn.subscribe(status => {
      if (!status) {
        this.router.navigate(['/login']);
      }
    });
  }

  // Getter for easy access to form controls
  get f() {
    return this.postForm.controls;
  }
  goBack(): void{
    this.router.navigate(['/postlist']);

  }

  onSubmit(): void {
    this.isSubmitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.postForm.invalid) {
      return;
    }

    this.isSubmitting = true;     

    const newPost: PostRequest = { 
      id:this.isEditFlag? this.editid: 0,     
      postText: this.postForm.value.content       
    };
    if(!this.isEditFlag){
    this.postService.createPost(newPost).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.successMessage =  'Post created successfully!';
        this.postForm.reset();
        this.isSubmitted = false;
         
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error;
      }
    });
  }
  else{
    this.postService.updatePost(newPost).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.successMessage =  'Post updated successfully!';
        this.postForm.reset();
        this.isSubmitted = false;
         //reset all flag once edit is complete
        if(this.isEditFlag){
          this.editPostEvent.emit(false);
        }

      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error;
      }
    });

  }
  }
}
