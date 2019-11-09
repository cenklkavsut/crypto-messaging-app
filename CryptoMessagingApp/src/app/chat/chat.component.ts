import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { json } from 'body-parser';
// import {Crypto} from "@arkecosystem/crypto"; //this allows for performing crypto operations.
// import { Connection } from "@arkecosystem/client";//this allows performing fetching operations.

import {Crypto} from 'crypto-js';//this is the library for crypto operations
import {
  Block,
  FullNode,
  ListOnChain,
  HashTools,
  KeyValueStorage,
  SequenceStorage,
  SmartContract,
  NodeBrowser,
  NetworkApi,
  NetworkClientBrowserImpl,
  NodeApi,
  NodeImpl,
  NodeTransfer,
  NodeNetworkClient,
  WebsocketConnector
} from 'server';//add these files to server
import { WebSocketConnector } from 'server/websocket-connector';
// import {rencontres}  from 'rencontres';

//the application send to the recipient and take ark to sent to the user but it does not allow the library to be used
@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})

//it sends the message based on the passphrase and recipient and sender
export class ChatComponent implements OnInit {
  roomName: string = ""; //make a query that fetches the provided room
  user: string = ""; //change this admin and room to a query that retrieves
  userList = new Array<string>(); //list of users
  messageText: string = ""; //the text recieved
  messageContainer: string; //temporary message container to store in array
  messageArray = new Array<string>(); //this array needs to send to the ark core blockchain but the api doesnt allow to be send over the ark
  message = this.messageText;  
  start:boolean=false;
  //
  recipientId: string = ""; //info from wallet to send or recieve message reipient is gonne be the room name
  SenderId: string = ""; //info from wallet to send or recieve message
  passPhrase: string = ""; //is needed to send messages.also it is the password you use to sign your wallet
  signed = null;
  //
  //this updates a room to the database
  updateRoom = gql`
    mutation updateRooms(
      $currentRoom: String!
      $recipient: String!
      $sender: String!
      $passphrase: String!
    ) {
      updateRooms(
        currentRoom: $currentRoom
        recipient: $recipient
        sender: $sender
        passphrase: $passphrase
      ) {
        currentRoom
      }
    }`;

  //this fetch a room to the database
  fetchRoom = gql`
    mutation fetchRoom(
      $currentRoom: String!
      $recipient: String!
      $sender: String!
      $passphrase: String!
    ) {
      fetchRoom(
        currentRoom: $currentRoom
        recipient: $recipient
        sender: $sender
        passphrase: $passphrase
      ) {
        currentRoom
      }
    }
  `;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {
    if(this.start==false) {//this allows to confirm the room name so it updates the correct room
      const adderRoom=prompt("Confirm the selected room!","Enter room name"); 
      this.roomName=adderRoom;

      const adderRecipient=prompt("Confirm the recipient!","Enter recipient/wallet/username name"); 
      this.recipientId=adderRecipient;

      const adderSender=prompt("Confirm the sender!","Enter sender name"); 
      this.SenderId =adderSender;     

      const adderPassPhrase=prompt("Confirm the passphrase!","Enter passphrase"); 
      this.passPhrase =adderPassPhrase;

      //remove this if statment later and remove the 4 lines and add change confirm to select username
      if(this.roomName=='x'&&this.recipientId=='x'&&this.SenderId=='x'&&this.passPhrase=='x')//
      {
        this.roomName="room";
        this.recipientId="Crypto";
        this.SenderId="Crypto";
        this.passPhrase="stuff embody praise place rail flag affair cattle speak rural gospel city";
      }//
      this.confirm()//this confirm the room and add it to the server
      this.start=true;
    }
    // console.log(Crypto); //look at the developer console output to inspect the contents of the crypto toolset
    // const m = this.messageText; //the message that gets hashed to be send
    // const hash = Crypto.HashAlgorithms.sha256(m); //the message gets hashed to be send to the chain

    // const signature = Crypto.Message.sign(hash.toString(), this.passPhrase); //the signature that gets the message and sends it
    // this.signed = {// this signs the message with data so it can be send over to the blockchain
    //   //the signed information of a string message
    //   message: m, // not really needed
    //   hash, // not really needed
    //   signature
    // };
    
    this.recieveMessage();//this allows to recieve the message
  }

  home(): void {//to go back to the page of the rooms
    this.router.navigate(["/home"]);
    alert("leaving chat!");
  } 

  //send message is correct check recieve,server and blockchain connection and wallet.
  async sendMessage() {
    //allows for sending message
    if (this.recipientId != "" && this.SenderId != "") {
      //recipient is reciever and the sender is where to send to
      if (this.user == "") {
        this.user = this.recipientId;
      }
      if (this.messageText != "") {
        this.messageContainer = this.messageText;
        this.messageArray.push(this.messageContainer);

        //let result = Crypto.Message.verify(this.signed.signature);//this verifies the message and allows it to be send
        // inspect the result of the verification process, which will be a boolean (true/falsnpm i @angular/router -se)
        // console.log(result);
        // if (!result) {
        //   alert("Message is empty! result of process is " + result); // do something if result if false..
        // }

      //here add the new send of the next blockchain
    
      let result;//hash the message
      //(result);//send to the blockchain
      
      if (!result) {//if sending is false than display allert
       alert("Message is empty! result of process is " + result); // do something if result if false..
      }

      this.apollo.mutate({
            //this updates the room information constantly when messaging!
            mutation: this.updateRoom,
            variables: {
              currentRoom: this.roomName,
              recipient: this.recipientId,
              sender: this.SenderId,
              passphrase: this.passPhrase
            }
          })
          .subscribe(
            ({ data }) => {
             //alert("information has been selected!" + JSON.stringify(data));
            },
            error => {
             alert("there was an error when loging in " +JSON.stringify(error));
            }
          );

        this.messageText = "";
      } else {
        alert("Message is empty!");
      }
    } else {
      alert("enter recipient id and sender id of your wallet correctly!");
    }

  }
//the message need to be send and hashed to the blockchain and then unhashed from the blockchain and stored in a array.
 async recieveMessage(){ //the client to recieve message/transaction and change resource to api if needed
  try {//here it fetches the block with data of the message 
    // const init = async () => {
    //   const connection: Connection = new Connection("http://0.0.0.0:4003/api/v2");//https://explorer.ark.io:8443/api here add blockchain source
    //   let response;//the response will fetch it as a block
    //   console.log(response = await connection.api("blocks").all());//this fetches all the data from the blockchain
    //this.messageArray.push(response.data);//this pushes it to the message array to display as message
    // };  
    // init();

    //here add the new recieve of the next blockchain
    //store it in the array
    let response;//the response will fetch it as a block
    //get data from blockchain block
    response=this.messageContainer ; //unhash the message from the blockchain and store in response 
    this.messageArray.push(response);//.data this pushes it to the message array to display as message

  } catch (e) {
    console.log(e);
  }  
}

  confirm() {
    //allows to comfirm and get rid of the drop down and add everything inside the constructor or here
    if (this.recipientId != "" && this.SenderId != "" && this.roomName != "") {
      this.apollo .mutate({
          //updates the room user to send a message
          mutation: this.updateRoom,
          variables: {
            currentRoom: this.roomName,
            recipient: this.recipientId,
            sender: this.SenderId,
            passphrase: this.passPhrase
          }
        })
        .subscribe(
          ({ data }) => {
            alert("information has been selected!" /*+data*/);
          },
          error => {
            alert("there was an error when loging in " + error);
          }
        );
    } else {
      alert("Empty or incorect information!");
    }
  }
 
 ngOnInit() {}  
}