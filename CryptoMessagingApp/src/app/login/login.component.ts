import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';

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