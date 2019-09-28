import { Component, OnInit, Input, Query } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
username: string;//does not recieve from ngModel   
password: string;//does not recieve from ngModel     
passwordConf:string;//does not recieve from ngModel  
conf: boolean = true;
temp: string="";//this is for adding empty data when started
login: boolean = true;//switch between Login and SignUp
counter:number=0;
usernameCheck: string;//this allows to recieve data to
passwordCheck: string;//this allows to recieve data to        

addBook = gql`mutation addBook($username:String!,$password:String!) {
addBook(username:$username,password:$password) {
_id
username
password
}}`;

checkLogin = gql`
mutation loginBook($username:String!,$password:String!){
loginBook(username:$username,password:$password) {
   _id
}}`;

constructor(private router: Router,private route: ActivatedRoute,private apollo: Apollo) {}

signIn():void{
try{
if(this.username!=null&& this.password!=null && this.login==true&& this.conf==false){//this allows logging in
//
this.apollo.mutate({// this should be a query that checks if exist of not 
mutation: this.checkLogin,variables: {username: this.username,password: this.password
}}).subscribe(({ data })=> {alert('Welcome!'/*+data*/);this.router.navigate(["/home"]);}
,(error) => {alert('there was an error when loging in '+ error);});//this checks and forwards to home
// 
}
else if(this.username!=null&&this.password!=null&&this.password==this.passwordConf&&this.login==false){

this.apollo.mutate({ mutation: this.addBook,//this creates the account in the database and forwads to login
variables: {
username: this.username,password:this.password
}}).subscribe(({ data }) => {alert('Account is generated, you will be redirected to login '+this.username);
this.login=true;this.passwordConf="";},(error) => {alert('there was an error maybe the username already exists '+ error);});

}
}catch (error) { }
if(this.counter==1){this.conf=false;this.counter=0;}//
else{this.counter=this.counter+1;}//this allows to get rid of the first time
}//add to if statments one checks if exist and the other one does somthing with the boolean returned to check the result

ngOnInit() {}
}