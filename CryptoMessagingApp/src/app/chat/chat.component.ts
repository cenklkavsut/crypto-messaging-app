import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
//import { Book } from '../../../../node-graphql/server/models/Book';
//const Client = require("@arkecosystem/client");
//const client = new Client("localhost:4003");//the blockchain node it point to

// RAZVAN:
// you can find the source code for these here:
// https://github.com/ArkEcosystem/core/tree/master/packages/crypto/src
const crypto = require("@arkecosystem/crypto");//this allows for performing crypto operations.

/**/

//the application send to the recipient and take ark to sent to the user but it does not allow the library to be used
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
//if room is equal the same see messages from both sides send message over the blockchain and recive it.
export class ChatComponent implements OnInit {
roomName:string="room";//make a query that fetches the provided room
recipientId:string='';//info from wallet to send or recieve message reipient is gonne be the room name 
SenderId:string='';//info from wallet to send or recieve message
user:string='';//change this admin and room to a query that retrieves
userList = new Array<string>();//list of users
messageText:string = 'here I am';//the text recieved
messageContainer:string;//temporary message container to store in array
messageArray=new Array<string>();//this array needs to send to the ark core blockchain but the api doesnt allow to be send over the ark
message=this.messageText;
passPhrase:string='passphrase';//is needed to send messages.also it is the password you use to sign your wallet
signed = null;

constructor(private router: Router,private route: ActivatedRoute,private apollo: Apollo)
{
// RAZVAN: look at the developer console output to inspect the contents of the crypto toolset
console.log(crypto);
// RAZVAN: don't create local variables that share the same name as global (outside the class) variables
//const k = crypto.Identities.Keys.fromPassphrase(this.passPhrase);//this key changes the passphrase of the wallet into a address finder
const m = this.messageText;//the message that gets hashed to be send
const hash = crypto.Crypto.HashAlgorithms.sha256(m);//the message gets hashed

// see https://github.com/ArkEcosystem/core/blob/master/packages/crypto/src/crypto/message.ts
const signature = crypto.Crypto.Message.sign(hash, this.passPhrase);//the signature that gets send
 this.signed = {//the signed information
    message: m, // not really needed
    hash, // not really needed
    signature
  };

  //client.setVersion(2);this makes the client run on version two of ark core
}

home():void{this.router.navigate(["/home"]); alert("leaving chat!");}//to go back to the page of the rooms
//send message is correct check recieve,server and blockchain connection and wallet.
async sendMessage(){//allows for sending message
  if(this.recipientId!=''&&this.SenderId!=''){//recipient is reciever and the sender is where to send to
  if (this.user==''){this.user=this.recipientId;}
  if(this.messageText!=''){
  this.messageContainer=this.messageText;
  this.messageArray.push(this.messageContainer);
  // see https://github.com/ArkEcosystem/core/blob/master/packages/crypto/src/crypto/message.ts
  let result = crypto.Crypto.Message.verify(
    this.signed.signature
  );/**/

  // inspect the result of the verification process, which will be a boolean (true/falsnpm i @angular/router -se)
  console.log(result);

  if (!result) {
    alert("Message is empty! result of process is "+result);// do something if result if false..
  }

  this.messageText='';
}else{
  alert("Message is empty!");
}
}else{
  alert("enter recipient id and sender id of your wallet correctly!");
}
}

/*async recieveMessage(){ //the client to recieve message/transaction
 try {
    const response = await client.resource("transactions").all({
      senderId: this.SenderId,//this recieves message from wallet and takes sender from user
      orderBy: "timestamp.epoch"
    });
    return this.messageContainer=response.data;//here its gonne push the message from the blockchain to the array
  } catch (e) {console.log(e);
  this.messageArray.push(this.messageContainer);//push the message in the array to be displayed
}
}*/
confirm(){//allows to comfirm
  if(this.recipientId!=''&&this.SenderId!=''&&this.SenderId!=''){
  alert("information has been selected");
  }
  else{
    alert("Empty or incorect information!");
  }
}/**/
ngOnInit() {}
}//add transaction to the api pool