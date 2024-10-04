import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
 
import { LoginComponent } from './login/login.component';
import { PostTextComponent } from './post-text/post-text.component';
import { PostListComponent } from './post-list/post-list.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
 
    LoginComponent,
    PostTextComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
   // provide: HTTP_INTERCEPTORS,
   { 
    provide: HTTP_INTERCEPTORS,
     useClass:AuthInterceptorService,
      multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
