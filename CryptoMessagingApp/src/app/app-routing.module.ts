import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
//import { HomeComponent } from './home/home.component'

const routes: Routes = [{path:  'login', component:  LoginComponent},//{path:  'home', component:  HomeComponent},
{path:  'chat', component:  ChatComponent}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }