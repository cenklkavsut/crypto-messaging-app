import { app } from "@arkecosystem/core-container";
import { EventEmitter, Logger } from "@arkecosystem/core-interfaces";
//allows for listening to events of the blockchain and checks if a block has been missed
const logger = app.resolvePlugin<Logger.ILogger>("logger");
const emitter = app.resolvePlugin<EventEmitter.EventEmitter>("event-emitter");
emitter.on("forger.missing", delegate => {//this will send a message if the blockchain missed a block.
   //This will be a wallet object that contains information like the address, username, public key, votes, etc.
  logger.warn(`${delegate.username} just missed a block.`);
});//the plugin listens to emited event by the blockchain also the emiter can emmit and listen o blockchain events
//Every user is a wallet basically... just need to figure out how to securely store their seeds in the app on the user side
/*- to create wallets, transactions, sign the transaction with a wallet you'll need to use Ark's Crypto library
- to send a signed transaction to the network you'll need to use Ark's Client library*/
//http://localhost:4003/api/node/configuration
//Use public/private key pairs to encrypt message contents (encrypt with public key, decrypt with private key) for instance
/*so by pulling data what I meant was, make API requests ever X seconds to an API endpoint and fetch the transactions 
and then get the msg from the transactions's vendor field , GET requests very X seconds to the API endpoint*/
//yarn relay:devnet,ark own ,yarn relay:testnet your own ark and sudo npm serve
//the server requires mongodb and monogoose and express,graphql to be installed and can be runned through npm start
//the app  uses Ark core js for the blockchain and angular,typscript for the application.