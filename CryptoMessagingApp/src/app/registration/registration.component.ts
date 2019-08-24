import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Book } from '../../../../node-graphql/server/models/book';
import * as express from "express";
import * as socketio from "socket.io";
import * as path from "path";
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public username: string='';
  public password: string;
  public passwordConf: string;
  public usernameConf: string='';
  public passwordInfo: string;
  constructor(private router: Router,private route: ActivatedRoute,private apollo: Apollo) { }
  
   signUp(): void {
     if(this.username != this.usernameConf && this.password == this.passwordConf){
      alert('Account Confirmed');
      this.router.navigate(["/home"]);
     }
     else{
              alert('Invalid credentials');
     } 
    }
  ngOnInit() {}
}