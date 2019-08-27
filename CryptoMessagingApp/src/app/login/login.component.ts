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

  
  constructor(private router: Router,private route: ActivatedRoute,private apollo: Apollo) { }

signIn():void{
  this.username=this.usernameConf;
  if(this.username!=null&&this.password!=null &&this.username!=""&&this.password!=""&&this.login==true){
alert('Welcome!');
//this.router.navigate(["/home"]);
}else if(this.username==null&&this.password==null &&this.username!=""&&this.password!=""&&this.password!=this.passwordConf&&this.login==false){
  alert('Account is generated!');
//this.router.navigate(["/login"]);
}
}

  ngOnInit() { }
}