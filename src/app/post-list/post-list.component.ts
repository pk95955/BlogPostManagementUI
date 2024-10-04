// src/app/components/post-list/post-list.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostService, PostResponse } from '../services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: PostResponse[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  editMessage: string=''; 
  postIdforEdit: number=-1;
  isLoading: boolean = false;
  isEdited:boolean =  false;

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.fetchPosts();
     
  }

  // Fetch all posts
  fetchPosts(): void {
    this.isLoading = true;
    this.postService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    });
  }

  editPost(id: number, text: string): void {
    this.editMessage = text;
    this.postIdforEdit=id;
    this.isEdited= false;
    setTimeout(() => {
      this.isEdited= true;
    }, 100);

    this.takeTop();
     

  }
  takeTop(){
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
  });
}
  // Delete a post with confirmation
  deletePost(id: number): void {
    if (confirm('Are you sure you want to delete this post?')) {
      this.isEdited= false;      
      this.postService.deletePost(id).subscribe({
        next: () => {
          this.successMessage = 'Post deleted successfully!';
          this.fetchPosts(); // Refresh the list
        },
        error: (error) => {
          this.errorMessage = error;
        }
      });
    }
  }
  //redirect 
  createNewPost():void{
    this.router.navigate(['/posttext'])
  }
  hideControl(evnent: any){
    this.isEdited = false;
    // refresh post list after update
    this.fetchPosts();
  }
  
}
