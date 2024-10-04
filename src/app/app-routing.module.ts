import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { LoginComponent } from './login/login.component';
import { PostTextComponent } from './post-text/post-text.component';
import { PostListComponent } from './post-list/post-list.component';

const routes: Routes = [
  {path: "", component: LoginComponent },
  {path: "login", component: LoginComponent },
 
  {path: "posttext", component: PostTextComponent},
  {path: "postlist", component: PostListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
