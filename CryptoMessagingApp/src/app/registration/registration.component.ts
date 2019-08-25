import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
   username: string='';
   password: string='';
   passwordConf: string='';
   usernameConf: string='query that checks if exist';//change this to query that checks if exists or not
   passwordInfo: string;
   currentRoom: string='';
   recipient: string='';
   message: string='';

  constructor(private router: Router,private route: ActivatedRoute,private apollo: Apollo) { }
  
    signUp():void {
     if(this.username != this.usernameConf && this.password == this.passwordConf &&
      this.username!=null && this.password !=null && this.passwordConf!=null
     /**/ &&this.username=='' && this.password =='' && this.passwordConf==''){
      alert('Account Confirmed');
  
      this.router.navigate(["/home"]);
     }
     else{
              alert('Invalid credentials');
     } 
    }

  ngOnInit() {}
}