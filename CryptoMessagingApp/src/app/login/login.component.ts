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
  public passwordConf: string;  
  login: boolean = true; // switch between Login and SignUp
/*addBooks = gql`mutation {
  addBook(username: "", password: "", sender: "", recipient: "", currentRoom: "", passpharse: "") {
    _id
    username
    password
  }
}`;*/

submitBook = gql`
  mutation addBook(
    $username: String!,
    $password: String!,
    $currentRoom: String!,
    $recipient: String!,
    $sender: String!,
    $passpharse: String!) {
    addBook(
      username: $username,
      password: $password,
      currentRoom: $currentRoom,
      recipient: $recipient,
      sender: $sender,
      passpharse: $passpharse) {
      _id
    }
  }
`;
addBook = gql`
  mutation addBook($username: String!,$password: String!,$currentRoom: String!,$recipient: String!,$sender: String!,$passpharse: String!) {
  addBook(username: $username,password: $password,currentRoom: $currentRoom,recipient: $recipient,sender: $sender,passpharse: $passpharse) {
    _id
    }
  }
`;

constructor(private router: Router,private route: ActivatedRoute,private apollo: Apollo) { }

signIn():void{
  if(this.username!=null &&this.password!=null && this.username!=""&& this.password!="" && this.login==true){
    //add here the query that check and for loging in
alert('Welcome!');
this.router.navigate(["/home"]);
}
else if(this.username==null&&this.password==null&&this.password==this.passwordConf&&this.login==false){
//this is for when a user generates an account if account is false make login true for going to the home page
//this.apollo.mutate({mutation: this.addBook}).subscribe();//this creates the account in the database
this.apollo.mutate({ mutation: this.addBook,
variables: {
username: this.username,password:this.password,currentRoom: this.temp,recipient: this.temp,sender: this.temp,passpharse: this.temp
  }}).subscribe(({ data }) => {alert('Account is generated, you will be redirected to login!');
  }, (error) => {alert('there was an error sending the query '+ error);});
this.login=true; 
}
}
ngOnInit() {}
}