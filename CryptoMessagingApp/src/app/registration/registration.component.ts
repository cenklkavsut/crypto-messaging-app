import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit{
   public username: string='';
   public password: string='';
   public passwordConf: string='';
   public usernameConf: string='query that checks if exist';//change this to query that checks if exists or not
   public passwordInfo: string;
   public currentRoom: string='';
   public recipient: string='';
   public sender: string='';
   public passphrase: string='';
   
constructor(private router: Router,private route: ActivatedRoute,private apollo: Apollo) {}
   
   signUp():void {
     if(this.username != this.usernameConf && this.password == this.passwordConf &&
      this.username!=null && this.password !=null && this.passwordConf!=null
      /*&& this.username=='' && this.password =='' && this.passwordConf==''*/){
      alert('Account Confirmed');
  
      this.router.navigate(["/home"]);
     }
     else{
              alert('Invalid credentials');
     } 
    }

  ngOnInit() {}
}