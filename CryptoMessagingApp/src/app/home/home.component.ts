import { Component, OnInit, Query } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
  
export class HomeComponent implements OnInit {
roomName:string;//use this to delete room names
add:string;//add gets the inputs
roomList = new Array<string>();//this list contains room names
logged: boolean = false;
temp:string="";

//this adds a room to the database
  addRoom = gql`mutation addroom($currentRoom:String!,$recipient:String!,$sender:String!,$passphrase:String!) {
  addroom(currentRoom:$currentRoom,recipient:$recipient,sender:$sender,passphrase:$passphrase) {
  _id
  }}`;
  //this updates a room to the database
  updateRoom = gql`mutation updateRooms($currentRoom:String!,$recipient:String!,$sender:String!,$passphrase:String!) {
    updateRooms(currentRoom:$currentRoom,recipient:$recipient,sender:$sender,passphrase:$passphrase) {
    currentRoom
    }}`;

  checkQuery = gql`
  query{
  rooms{
  currentRoom
  }}`;

  removeRoom = gql`
  mutation removeRooms($currentRoom:String!,$recipient:String!,$sender:String!,$passphrase:String!) {
    removeRooms(currentRoom:$currentRoom,recipient:$recipient,sender:$sender,passphrase:$passphrase) {
      currentRoom
    }}`;

constructor(private router: Router,private route: ActivatedRoute,private apollo: Apollo) {this.roomList.push("room");}

  join():void{
  this.roomName=this.add;
  const index = this.roomList.indexOf(this.roomName);
  this.roomName=this.roomList[index]; 

 this.apollo.mutate({mutation: this.updateRoom,
  variables: {currentRoom:this.roomName,recipient:this.temp,sender:this.temp,passphrase:this.temp
  }}).subscribe(({ data }) => { alert('Room selected! '/*+data*/);this.router.navigate(["/chat"]);}
  ,(error) => {alert('Please enter a room! '+error);});  

}//find a way to fetch id with graphql and then make a query that fetches id and then update based on it.
    
  roomLists():string{//return a string room
   for (var i = 0; i < this.roomList.length; i++) 
    {
      this.roomName=this.roomList[i];i+=1;
      return this.roomName;
    } 
  }

create():void{
  this.roomName=this.add;
  this.roomList.push(this.roomName);
  this.add='';
  this.apollo.mutate({mutation: this.addRoom,
  variables: {currentRoom:this.roomName,recipient:this.temp,sender:this.temp,passphrase:this.temp
  }}).subscribe(({ data }) => { alert('Room created!'); },(error) => {alert('Please enter a room!');});   
}

delete():void{
  this.roomName=this.add;
  const index = this.roomList.indexOf(this.roomName);
  if (index != -1) {
    //this.roomList.splice(index, 1);  
    //alert('Room deleted!');
    //this.add=''; 
    this.apollo.mutate({mutation: this.removeRoom,
    variables: {currentRoom:this.roomName,recipient:this.temp,sender:this.temp,passphrase:this.temp
    }}).subscribe(({ data }) => {this.roomList.splice(index, 1);this.add='';alert('Room deleted! '/*+data*/);
     },(error) => {alert('Please enter a room!');});  
   }
   else{ 
     //this.roomList.splice(index, 1);  
     alert('Room deletion error!');    
  }
}

   logout():void{
    this.apollo.getClient().resetStore();
    this.router.navigate(["/login"]);//here update room name with empty
  }

  ngOnInit() {}
}