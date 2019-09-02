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
  public username: string="";
  public password: string="";
  public passwordConf:string="";
  conf: boolean = true;
  public temp: string="";//this is for adding empty data when started
  login: boolean = true;//switch between Login and SignUp
  counter:number=0;
/*addBooks = gql`mutation {
  addBook(username: "", password: "", sender: "", recipient: "", currentRoom: "", passpharse: "") {
    _id
    username
    password
 }}`;*/

addBook = gql`mutation addBook($username:String!,$password:String!) {
addBook(username:$username,password:$password) {
_id
username
password
}}`;

checkBook = gql`mutation addBook($username:String!,$password:String!) {
addBook(username:$username,password:$password) {
username
password
}}`;

constructor(private router: Router,private route: ActivatedRoute,private apollo: Apollo) { }

signIn():void{
  try {
if(/**/this.username!=null&& this.password!=null && this.login==true&& this.conf==false){//this allows logging in
this.apollo.mutate({mutation: this.checkBook,
 variables: {
 username: this.username,password:this.password
 }}).subscribe(({ data }) => {alert('Welcome!');this.router.navigate(["/home"]);
 },(error) => {alert('there was an error when loging in '+ error);});//this checks and forwards to home
}
else if(/**/this.username!=null&&this.password!=null&&this.password==this.passwordConf&&this.login==false&& this.conf==false){
//this.apollo.mutate({mutation: this.addBooks}).subscribe();
this.apollo.mutate({ mutation: this.checkBook,
variables: {
username: this.username,password:this.password
}}).subscribe(({ data }) => {alert('Account is generated, you will be redirected to login!');this.login=true;
},(error) => {alert('there was an error maybe the username already exists '+ error);});//this creates the account in the database and forwads to login
}
} catch (error) { }
if(this.counter==2){this.conf=false;}else{this.counter=this.counter+1;}//this allows to get rid of the first time
}

ngOnInit() {}
}