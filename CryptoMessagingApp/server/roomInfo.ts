//message is a transaction that contains a string and it gets hashed the informations in direction with recipientId,sender,passphrase
//then implment fetch messages and try to addapt send and fetch to your custom devnet
//fix not complete login and fetch isue and try to fetch information from the app for chat. 

//For message add this information before the signature
//verify Verify the given message, public key and signature combination.
//toArray Turn the message into a standardized array.
//toJson Turn the message into a JSON string using the toArray data as the source.

/*
const address=crypto.address.fromPassphrase(this.passPhrase);//this gets the addrss of the message 
const privateKey=crypto.privateKey.fromPassphrase(this.passPhrase);//this gets the private key of the message
const publicKey=crypto.publicKey.fromPassphrase(this.passPhrase);//this gets the public key of the message
crypto.publicKey.validate(publicKey);//this validates public key
crypto.address.validate(address);//this validates public private

const fixture = {
  data:{
  publicKey:publicKey,signature:signature,//get signature and change place 
  message: this.messageText},passphrase: this.passPhrase
};
*/
//start server nodemon //sudo ng serve app //yarn relay:devnet for blockchain server 