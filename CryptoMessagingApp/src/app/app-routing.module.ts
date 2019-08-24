import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [{path:  'login', component:  LoginComponent},{path:  'home', component:  HomeComponent},{path:  'register', component:  RegistrationComponent},
{path:  'chat', component:  ChatComponent}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }