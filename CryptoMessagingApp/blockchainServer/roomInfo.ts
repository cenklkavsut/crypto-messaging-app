class roominfo{
roomNames:string;
roomLists = new Array<string>();//this list contains room names

constructor(){}
//database needs to store login info and allow registering store room names and allow selecting a room.
addRoom(name:string){
    this.roomLists.push(name);  
}
//server allow the messages to be seen if in the same room.//then finish the blockchain messaging bit.
roomUse():string{
    for (var i = 0; i < this.roomLists.length; i++) 
    {
     this.roomNames=this.roomLists[i];
     i+=1;
      return this.roomNames;//list all rooms by looping through
     } 
   }
}//to run mogo db localhost:3000/graphql
  //here add a way to send to the blockchain
  /*identities.address.fromPassphrase(this.passPhrase);
  identities.publicKey.fromPassphrase(this.passPhrase);//add signature and passprase to the ui   
  identities.privateKey.fromPassphrase(this.passPhrase);//private key for the transaction
  identities.address.validate("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib"); 
  identities.publicKey.validate("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
  identities.publicKey.validate(this.passPhrase);*/
/*crypto.verifyHash(signed.hash,signed.signature,"034151a3ec46b5670a682b0a63394f863587d1bc97483b1b");*/