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
  counter:number=0;

  constructor(private router: Router,private route: ActivatedRoute,private apollo: Apollo) { }

signIn():void{
  if(this.username!=null&&this.password!=null &&this.username!=""&&this.password!=""&&this.login==true){

alert('Welcome!');
this.router.navigate(["/home"]);
}
else if(this.username==null&&this.password==null&&this.login==false){
  alert('Account is generated, you will be redirected to login!');
//this is for when a user generates an account if account is false make login true for going to the home page
  if(this.counter==1){this.login=true; this.counter=0;
}else{this.counter=this.counter+1;}
}
}

  ngOnInit() { }
}