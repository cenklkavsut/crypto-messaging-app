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
add:string;//add gets the inputs//ngModel [ngModelOptions]="{name:'username'}"
roomList = new Array<string>();//this list contains room names
logged: boolean = false;
temp:string="";
 id:any;
 
updateRoom = gql`mutation updateRoom($currentRoom:String!,$recipient:String!,$sender:String!,$passphrase:String!) {
  updateRoom(currentRoom:$currentRoom,recipient:$recipient,sender:$sender,passphrase:$passphrase) {
  _id
  currentRoom
  recipient
  sender
  passphrase
  }}`;

//if room doesn't exist add room and if room is choosen update currentRoom and make the rest empty 
 addRoom = gql`mutation addroom($currentRoom:String!,$recipient:String!,$sender:String!,$passphrase:String!) {
  addroom(currentRoom:$currentRoom,recipient:$recipient,sender:$sender,passphrase:$passphrase) {
    _id
  }}`;

  checkRoom = gql`
  query room($id: String) {
    room(id: $id) {
      _id
      currentRoom
      recipient
      sender
      passphrase
    }
  }`;

  checkCurrentRoom = gql`{
  rooms(limit: 10){
  currentRoom
    }
  }`;

  checkQuery = gql`
  query room($id: String,$currentRoom: String) {
    room(id: $id,currentRoom: $currentRoom) {
      _id
      currentRoom
      recipient
      sender
      passphrase
    }
  }`;

 removeRoom = gql`
  mutation removeRoom($id: String!) {
    removeBook(id:$id) {
      _id
    }
  }`;
  
constructor(private router: Router,private route: ActivatedRoute,private apollo: Apollo) {} 

  join():void{     
    const index = this.roomList.indexOf(this.roomName);
     this.roomName=this.roomList[index];           
     this.apollo.mutate({mutation: this.updateRoom,
      variables: {currentRoom:this.roomName,recipient:this.temp,sender:this.temp,passphrase:this.temp
      }}).subscribe(({ data }) => { alert('Room selected! '+data );this.router.navigate(["/chat"]); }
      ,(error) => {alert('room not selected '+ error);});          
    }
    
  roomLists():string{
     for (var i = 0; i < this.roomList.length; i++) 
     {
      this.roomName=this.roomList[i];
      i+=1;
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
}//this adds a room name to the list

delete():void{
  this.roomName=this.add;
  const index = this.roomList.indexOf(this.roomName);
  if (index != -1) {
    this.roomList.splice(index, 1);  
     alert('Room deleted!');
     this.add='';
   } else{ 
     this.roomList.splice(index, 1);  
     alert('Room deletion error!');    
  } 
}
   logout():void{
    this.apollo.getClient().resetStore();
    this.router.navigate(["/login"]);//here update room name with empty
  }

  ngOnInit() {}
}