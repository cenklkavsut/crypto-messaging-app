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
  public temp: string="";
  public passwordConf:string;
  login: boolean = true;//switch between Login and SignUp
/*addBooks = gql`mutation {
  addBook(username: "", password: "", sender: "", recipient: "", currentRoom: "", passpharse: "") {
    _id
    username
    password
  }}`;*/

addBook = gql`mutation addBook($username:String!,$password:String!,$currentRoom:String!,$recipient: String!,$sender:String!,$passpharse: String!) {
addBook(username:$username,password:$password,currentRoom:$currentRoom,recipient:$recipient,sender:$sender,passpharse:$passpharse) {
_id
}}`;

checkBook = gql`mutation addBook($username:String!,$password:String!,$currentRoom:String!,$recipient: String!,$sender:String!,$passpharse: String!) {
addBook(username:$username,password:$password,currentRoom:$currentRoom,recipient:$recipient,sender:$sender,passpharse:$passpharse) {
username
password
}}`;

constructor(private router: Router,private route: ActivatedRoute,private apollo: Apollo) { }

signIn():void{
if(this.username!=""&& this.password!="" && this.login==true){//this allows logging in
this.apollo.mutate({mutation: this.checkBook,
 variables: {
 username: this.username,password:this.password,currentRoom: this.temp,recipient:this.temp,sender:this.temp,passpharse:this.temp
 }}).subscribe(({ data }) => {alert('Welcome!');this.router.navigate(["/home"]);
 },(error) => {alert('there was an error sending the query '+ error);});//this checks and forwards to home
}
else if(this.username==null&&this.password==null&&this.password==this.passwordConf&&this.login==false){
//this.apollo.mutate({mutation: this.addBooks}).subscribe();
this.apollo.mutate({ mutation: this.addBook,
variables: {
username: this.username,password:this.password,currentRoom: this.temp,recipient:this.temp,sender:this.temp,passpharse:this.temp
}}).subscribe(({ data }) => {alert('Account is generated, you will be redirected to login!');this.login=true;
},(error) => {alert('there was an error maybe the username already exists '+ error);});//this creates the account in the database and forwads to login
}
}

ngOnInit() {}
}