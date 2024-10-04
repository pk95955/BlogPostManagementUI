// src/app/services/post.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { globalConstant } from '../global-variable';

export interface PostRequest {
  id: number;  
  postText: string;
}
export interface PostResponse {
  id: number;  
  postText: string;
  userName: string; 
  dateCreate: string;
}


@Injectable({
  providedIn: 'root'
})
export class PostService {   

  constructor(private http: HttpClient) { }
// fetch all post
 getPosts(): Observable<PostResponse[]> {
  return this.http.get<PostResponse[]>(`${globalConstant.apiUrl}BlogPost/Get`)
    .pipe(
      catchError(this.handleError)
    );
}
  // Create a new post
  createPost(post: PostRequest): Observable<PostResponse> {
    

    return this.http.post<PostResponse>(`${globalConstant.apiUrl}BlogPost/Post`, post)
      .pipe(
        catchError(this.handleError)
      );
  }

  // update a existing post
  updatePost(post: PostRequest): Observable<PostResponse> {
    

    return this.http.post<PostResponse>(`${globalConstant.apiUrl}BlogPost/update`, post)
      .pipe(
        catchError(this.handleError)
      );
  }
// Delete a post by ID
deletePost(id: number): Observable<void> {
  const url = `${globalConstant.apiUrl}BlogPost/delete/${id}`;
  return this.http.delete<void>(url)
    .pipe(
      catchError(this.handleError)
    );
}
  // Handle errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
