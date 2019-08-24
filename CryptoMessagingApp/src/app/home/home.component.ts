import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Book } from '../../../../node-graphql/server/models/book';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
  
export class HomeComponent implements OnInit {
roomName:string;//use this to delete room names
add:string;
roomList = new Array<string>();//this list contains room names
message:string='name';//this needs a query that gets the list of rooms from database
constructor(private router: Router,private route: ActivatedRoute,private apollo: Apollo) 
  {  
    this.roomLists(); 
  } //add in the constructor an auto load option and add user name and servers in the server
   //rooms:roominfo = new roominfo();
  join():void{
     //this.rooms.addRoom(this.roomName);
     this.router.navigate(["/chat"]);
    }
  
  roomLists():string{
     for (var i = 0; i < this.roomList.length; i++) 
     {
      this.roomName=this.roomList[i];
      i+=1;
       return this.roomName;//list all rooms by looping through
      } 
    }
create():void{
  this.roomName=this.add;
  this.roomList.push(this.roomName);
  alert('Room created!'); 
  this.add='';
}//this adds a room name to the list

delete():void{  this.roomName=this.add;
   const index: number = this.roomList.indexOf(this.roomName);
   if (index > -1) {
     this.roomList.splice(index, 1);alert('Room deleted!');
    }
  }//this removes a room name to the list
 ngOnInit() {}
}