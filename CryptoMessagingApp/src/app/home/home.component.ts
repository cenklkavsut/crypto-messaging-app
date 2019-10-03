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
  //this deletes the room from the database
  removeRoom = gql`
  mutation removeRooms($currentRoom:String!,$recipient:String!,$sender:String!,$passphrase:String!) {
  removeRooms(currentRoom:$currentRoom,recipient:$recipient,sender:$sender,passphrase:$passphrase) {
    currentRoom
  }}`;
  //this updates a room to the database
  updateRoom = gql`mutation updateRooms($currentRoom:String!,$recipient:String!,$sender:String!,$passphrase:String!) {
    updateRooms(currentRoom:$currentRoom,recipient:$recipient,sender:$sender,passphrase:$passphrase) {
    currentRoom
    }}`;
    
  checkQuery = gql`query {
  roomsName{
  currentRoom
  }}`;//this query should be able to check if room exist and then fetch the list of rooms

constructor(private router: Router,private route: ActivatedRoute,private apollo: Apollo) {this.roomList.push("room");
this.apollo.watchQuery({query: this.checkQuery,
}).valueChanges.subscribe(({ data }) => { this.roomList.push(""+data);});
}

  join():void{//this selects the room and updates the room name and the rest as empty to be used.
  this.roomName=this.add;
  const index = this.roomList.indexOf(this.roomName);
  this.roomName=this.roomList[index]; //this could check if it exists and if it does it joins the room

 this.apollo.mutate({mutation: this.updateRoom,//this will be filter room and same for chat
  variables: {currentRoom:this.roomName,recipient:this.temp,sender:this.temp,passphrase:this.temp
  }}).subscribe(({ data }) => { alert('Room selected!'/*+data*/);this.add=data.toString();this.router.navigate(["/chat"]);}
  ,(error) => {alert('Please enter a room! '+error);}); 
}
    
  roomLists():string{//return a string room
   for (var i = 0; i < this.roomList.length; i++) 
    {//later add a way to fetch room names and add it to the list
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
  var r = confirm('Delete the room completely press on cancel only delete from list press ok!');
  if (index != -1) {
    if(r==true){
    this.roomList.splice(index, 1);  
    alert('Room deleted');
    this.add=''; 
    }else{
    this.apollo.mutate({mutation: this.removeRoom,
    variables: {currentRoom:this.roomName,recipient:this.temp,sender:this.temp,passphrase:this.temp
    }}).subscribe(({ data }) => {this.roomList.splice(index, 1);data=this.add;this.add='';alert('Room deleted! '+data/**/);
    },(error) => {alert('Please enter a room!');});
  }
} else{ 
     alert('Room deletion error!');    
  }
}

   logout():void{
    //this.apollo.getClient().resetStore();//this supports the log out query side
    this.router.navigate(["/login"]);//here update room name with empty
  }

  ngOnInit() {}
}