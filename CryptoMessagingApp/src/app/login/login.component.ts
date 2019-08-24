import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Book } from '../../../../node-graphql/server/models/book';
import * as express from "express";
import * as socketio from "socket.io";
import * as path from "path";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
 
  public usernameConf: string;
  public passwordInfo: string;

  constructor(private router: Router,private route: ActivatedRoute,private apollo: Apollo) { 
  }

signIn():void{this.username=this.usernameConf;
        alert('Welcome!');
this.router.navigate(["/home"]);
}
  ngOnInit() { }
}