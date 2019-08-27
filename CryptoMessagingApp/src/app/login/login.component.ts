import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
 
  public usernameConf: string;
  public passwordConf: string;  
  login: boolean = true; // switch between Login and SignUp

  
  constructor(private router: Router,private route: ActivatedRoute,private apollo: Apollo/*,private authService: AuthService*/) { }

signIn():void{
  this.username=this.usernameConf;
  
        alert('Welcome!');
this.router.navigate(["/home"]);
}

/*saveUserData(id, token) {
  localStorage.setItem(GC_USER_ID, id);
  localStorage.setItem(GC_AUTH_TOKEN, token);
  this.authService.setUserId(id);
}*/

  ngOnInit() { }
}