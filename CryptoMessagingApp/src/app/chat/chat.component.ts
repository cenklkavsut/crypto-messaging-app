import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag"; //monogoose graphql express/appolo graphql.
import { json } from 'body-parser';
// import {Crypto} from "@arkecosystem/crypto"; //this allows for performing crypto operations.
// import { Connection } from "@arkecosystem/client";//this allows performing fetching operations.
/////////
import {//importatant for crypto operations
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
} from '../../../server';
import * as PeerToPeer from '../../../server/rencontres';
import * as CryptoJS from 'crypto-js';
import { WebSocketConnector } from '../../../server/websocket-connector';
//extra blockchain required
const NETWORK_CLIENT_IMPL = new NetworkClientBrowserImpl.NetworkClientBrowserImpl();
const STORAGE_BLOCKS = 'blocks';
const STORAGE_SETTINGS = 'settings';
function sleep(time: number) {
  return new Promise((resolve, reject) => setTimeout(resolve, time))
}
declare function require(v: any): any; 
///////////

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
  recipientId: string = ""; //info from wallet to send or recieve message reipient is gonne be the room name
  SenderId: string = ""; //info from wallet to send or recieve message
  passPhrase: string = ""; //is needed to send messages.also it is the password you use to sign your wallet
  signed = null;

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

////////////////
      // if (this.autoSave) {//this save the information of the current block
      //   this.saveBlocks();
      //   this.savePreferencesToLocalStorage();
      // }
      // else {
      //   this.resetStorage();//this reset the storage if it overflows or data is unreadable
      // }
      this.call();
/////////////////

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
        this.user = this.recipientId;//here it sets the username
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
      window.addEventListener('beforeunload', this.onUnloadListener);
      this.loadPreferencesFromLocalStorage();
      this.initFullNode();
//////////
if (this.decypherCache.has(this.messageContainer)){
return this.decypherCache.get(this.messageContainer);}
let decypheredMessage = `(crypted) ${this.messageContainer}`
for (let key of this.otherEncryptionKeys) {
let decyphered = CryptoJS.AES.decrypt(this.messageContainer, key).toString(CryptoJS.enc.Utf8);
if (!decyphered || decyphered.length < 6){
  continue;
}
let check = decyphered.substr(-3);
decyphered = decyphered.substr(0, decyphered.length - 3);
if (check == decyphered.substr(-3)) {
  this.decypherCache.set(this.messageContainer, decyphered);
  decypheredMessage = decyphered;
  break;
}
}
this.decypherCache.set(this.messageContainer, decypheredMessage);
let response;//the response will fetch it as a block
//get data from blockchain block  
response=decypheredMessage; //unhash the message from the blockchain and store in response 
this.messageArray.push(response);//.data this pushes it to the message array to display as message
////////////

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
        //alert("Message is empty!");
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
////////////////////
    this.logs.unshift(this.messageContainer);
    if (this.logs.length > 20){//if the chain bigger than 20 then pop
      this.logs.pop();}//this pops data from the list if bigger than 20

    if (this.isMining || this.messageContainer == '' || this.miningDifficulty <= 0)
      return;
    this.isMining = true;
    try {
      let dataItem = {
        id: this.guid(),
        author: this.pseudo,
        message:this.messageContainer,
        encrypted: false
      }
      if (this.encryptMessages && this.encryptionKey) {//this bit encrypts the message
        dataItem.message = dataItem.message.padStart(3, '=');
        this.addEncryptionKey(this.encryptionKey);
        dataItem.message = CryptoJS.AES.encrypt(dataItem.message + dataItem.message.substr(-3),
        this.encryptionKey).toString();
        dataItem.encrypted = true;
      }
      console.log(`start mining...`);
      this.fullNode.miner.addData(this.selectedBranch, dataItem);
      let mineResult = await this.fullNode.miner.mineData(this.miningDifficulty, 30);
      console.log(`finished mining: ${JSON.stringify(mineResult)}`);
    }
    catch (error) {
      console.log(`error mining: ${JSON.stringify(error)}`);
    }
      this.isMining = false;
////////////////////////
    //here add the new recieve of the next blockchain
    //store it in the array
    let response;//the response will fetch it as a block
    //get data from blockchain block  
    //response=decypheredMessage; //unhash the message from the blockchain and store in response 
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
// this contains the mining of the blockchain and blockchain interactions

proposedPseudo = this.guid();
userStarted = false;
// To save
pseudo = null;
encryptMessages = false;
encryptionKey = this.guid();
otherEncryptionKeys: string[] = [];
desiredNbIncomingPeers = 3;
desiredNbOutgoingPeers = 3;
autoP2P = false;
autoSave = true;
autoStart = true;
miningDifficulty = 100;
maxNumberDisplayedMessages = 100;
selectedBranch = Block.MASTER_BRANCH;
//data on the node and based on a linked list structure
fullNode: FullNode.FullNode = null;
  logs: string[] = []
  state: {
    [key: string]: {
      branch: string
      head: string
      blocks: any[]
    }
  } = { "master": { branch: Block.MASTER_BRANCH, head: null, blocks: [] } }

guid(){//this allows to calculate the chain set it to string
  //'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  return 'xxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0;
    let v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

  p2pBroker: PeerToPeer.PeerToPeerBrokering;
  isMining = false;
  autoMining = false;
  autoMiningIteration = 1;
  accepting = new Map<string, { offerId: string; offerMessage: string }>();
  knownAcceptedMessages = new Set<string>();

  private peersSockets = new Map<FullNode.PeerInfo, { ws: NetworkApi.WebSocket, 
  isSelfInitiated: boolean, counterpartyId: string }>();
  private decypherCache = new Map<string, string>();
  private onUnloadListener;

  get branches() {//gets the state 
    return Object.getOwnPropertyNames(this.state);
  }

  get incomingPeersCount() {//this counts the incoming peers
    let count = 0
    this.fullNode.peerInfos.forEach(peer => {
      if (this.peersSockets.has(peer) && !this.peersSockets.get(peer).isSelfInitiated)
        count++;
    })
    return count;
  }

  get outgoingPeersCount() {//this count the out going peers
    let count = 0
    this.fullNode.peerInfos.forEach(peer => {
      if (this.peersSockets.has(peer) && this.peersSockets.get(peer).isSelfInitiated)
        count++;
    });
    return count;
  }

    
call(){//this call the peer to peer information
    this.p2pBroker = new PeerToPeer.PeerToPeerBrokering(`wss://${window.location.hostname}:8999/signal`,() => {
        this.maybeOfferP2PChannel();
      },(offerId, offerMessage) => {
        if (!this.autoP2P) {
          return { accepted: false, message: `nope` };
        }
        if (this.incomingPeersCount >= this.desiredNbIncomingPeers) {
          return { accepted: false, message: `nope` };
        }
        if (this.knownAcceptedMessages.has(offerMessage) || this.accepting.has(offerMessage)) {
          return { accepted: false, message: `i know you` };
        }
        this.accepting.set(offerMessage, { offerId, offerMessage })
        setTimeout(() => this.accepting.delete(offerMessage), 5000);
        console.log(`accepted offer ${offerId.substr(0, 7)}:${offerMessage}`);

        return { accepted: true, message: this.pseudo };
      },(description, channel) => {
        let counterPartyMessage = description.counterPartyMessage;
        this.knownAcceptedMessages.add(counterPartyMessage);
        channel.on('close', () => this.knownAcceptedMessages.delete(counterPartyMessage));
        this.addPeerBySocket(channel, counterPartyMessage, description.isSelfInitiated, 
       `p2p with ${counterPartyMessage} on channel ${description.offerId.substr(0, 5)} 

       ${description.isSelfInitiated ? '[OUT]' : '[IN]'} (as '${this.pseudo}')`);
        setTimeout(() => this.maybeOfferP2PChannel(), 500);
      }
    );
    setInterval(() => {
      if (this.autoP2P && this.p2pBroker.ready)
        this.maybeOfferP2PChannel()
    }, 10000);

    if (this.autoStart && this.pseudo) {
      this.userStarted = true
    }  
}

  private nextLoad: { branch, blockId } = { branch: null, blockId: null }
  private lastLoaded = { branch: null, blockId: null }

  private triggerLoad(branch: string, blockId: string) {//this pass it on to the next linked list
    this.nextLoad = { branch, blockId }
  }

  private async loadState(branch: string, blockId: string) {//loadsthe blockchain state 
    if (this.state && this.state[branch] && this.state[branch].head == blockId)
      return;

    // only update current state of the blockchain
    // stop when we encounter the current branch head of the blockchain
    // if not found, replace the head of the blockchain and uses a link list like data structure similar to bitcoin

    let state = {};
    let toFetch = blockId;
    let branchState = {
      branch: branch,
      head: toFetch,
      blocks: []
    };

    let count = 0;
    let toFetchs = [toFetch];
    while (toFetchs.length) {
    let fetching = toFetchs.shift();
      let blockMetadatas = await this.fullNode.node.blockChainBlockMetadata(fetching, 1);
      let blockMetadata = blockMetadatas && blockMetadatas[0];
      let blockDatas = await this.fullNode.node.blockChainBlockData(fetching, 1);
      let blockData = blockDatas && blockDatas[0];
      branchState.blocks.push({ blockMetadata, blockData });

      blockData && blockData.previousBlockIds
      && blockData.previousBlockIds.forEach(b => !toFetchs.some(bid => bid == b) && toFetchs.push(b))

      count++;
      if (count > this.maxNumberDisplayedMessages)
        break;
    }

    state[branch] = branchState;
    this.state = state;
  }

  private initFullNode() {//this initialises the full node 
    this.fullNode = new FullNode.FullNode(NETWORK_CLIENT_IMPL);

    setInterval(() => {
      if (this.lastLoaded.blockId != this.nextLoad.blockId || this.lastLoaded.branch != this.nextLoad.branch) {
        this.lastLoaded = { branch: this.nextLoad.branch, blockId: this.nextLoad.blockId };
        this.loadState(this.lastLoaded.branch, this.lastLoaded.blockId);
      }
    }, 500);

    this.tryLoadBlocksFromLocalStorage();
    this.fullNode.node.addEventListener('head', async (event) => {
      console.log(`new head on branch '${event.branch}': ${event.headBlockId.substr(0, 7)}`);
      this.triggerLoad(event.branch, event.headBlockId);
    });
  }

  setPseudo(pseudo, peerToPeer) {//this sets initial data when active
    this.userStarted = true;
    this.pseudo = pseudo;
    this.autoP2P = peerToPeer;
    this.maybeOfferP2PChannel();
  }
//the the offer p2p generate 2 p2p channels for the chain
  maybeOfferP2PChannel() {
    if (this.autoP2P && this.p2pBroker.ready && this.outgoingPeersCount < this.desiredNbOutgoingPeers) {
      this.offerP2PChannel();
    }
  }

  offerP2PChannel() {
    let offerId = this.p2pBroker.offerChannel(this.pseudo);
  }

  addEncryptionKey(newEncryptionKey: string) {//this adds encryption key
    if (!newEncryptionKey || !newEncryptionKey.length || this.otherEncryptionKeys.includes(newEncryptionKey))
      return;

    this.decypherCache.clear();
    this.otherEncryptionKeys.push(newEncryptionKey);
  }

  removeEncryptionKey(key) {//this removes the encryption of the recieved message
    this.otherEncryptionKeys = this.otherEncryptionKeys.filter(k => k != key);
  }

  toggleAutoP2P() {//this automaatically calls p2p
    if (this.autoP2P) {
      this.autoP2P = false;
    }
    else {
      this.autoP2P = true;
      this.maybeOfferP2PChannel();
    }
  }

  async addPeer(peerHost, peerPort) {//this adds a peer to the chain connection through web sockets
    console.log(`add peer ${peerHost}:${peerPort}`);
    let ws = NETWORK_CLIENT_IMPL.createClientWebSocket(`wss://${peerHost}:${peerPort}/events`);
    this.addPeerBySocket(ws, `${peerHost}:${peerPort}`, true, `direct peer ${peerHost}:${peerPort}`);
  }

  private addPeerBySocket(ws: NetworkApi.WebSocket, counterpartyId: string, isSelfInitiated: boolean, description: string) {
    let peerInfo: FullNode.PeerInfo = null;
    let connector = null;

    ws.on('open', () => {//this opens the connection
      console.log(`peer connected`);
      connector = new WebSocketConnector(this.fullNode.node, ws);
      peerInfo = this.fullNode.addPeer(connector, description);
      this.peersSockets.set(peerInfo, { ws, counterpartyId, isSelfInitiated });
    });

    ws.on('error', (err) => {//this trigers on connection error
      console.log(`error with peer : ${err}`);
      ws.close();
    });

    ws.on('close', () => {//this closes the connection
      connector && connector.terminate();
      connector = null;
      this.fullNode.removePeer(peerInfo.id);
      this.peersSockets.delete(peerInfo);
      console.log('peer disconnected');
    });
  }

  toggleAutomine(minedData, automineTimer) {//this allows to mine data automatically
    if (this.autoMining) {
      this.autoMining = false;
    }
    else {
      this.autoMining = true;
      let action = async () => {
        if (this.autoMining)
          setTimeout(action,automineTimer);
      }
      action();
    }
  }

  disconnectPeer(peerInfo: FullNode.PeerInfo) {//this disconects the peer that it connects to
    this.fullNode.removePeer(peerInfo.id);
    let ws = this.peersSockets.get(peerInfo);
    ws && ws.ws.close();
    this.peersSockets.delete(peerInfo);
  }

  clearStorage() {// this clears the blockchain storage
    localStorage.clear();
    window.removeEventListener('beforeunload', this.onUnloadListener);
    window.location.reload(true);
  }

  resetStorage() {//this resets the blockchain storage
    localStorage.setItem(STORAGE_BLOCKS, JSON.stringify([]));

    let settings = {
      autoSave: false
    }
    localStorage.setItem(STORAGE_SETTINGS, JSON.stringify(settings));
  }

  savePreferencesToLocalStorage() {//this saves the preverances of the blockchain in the local storage
    let settings = {
      pseudo: this.pseudo,
      encryptMessages: this.encryptMessages,
      encryptionKey: this.encryptionKey,
      otherEncryptionKeys: this.otherEncryptionKeys,
      desiredNbIncomingPeers: this.desiredNbIncomingPeers,
      desiredNbOutgoingPeers: this.desiredNbOutgoingPeers,
      miningDifficulty: this.miningDifficulty,
      autoP2P: this.autoP2P,
      autoSave: this.autoSave,
      autoStart: this.autoStart
    }

    localStorage.setItem(STORAGE_SETTINGS, JSON.stringify(settings));
    console.log(`preferences saved`);
  }

  loadPreferencesFromLocalStorage() {//this load the blockchain preferances
    try {
      let settingsString = localStorage.getItem(STORAGE_SETTINGS);
      if (!settingsString || settingsString == '')
        return;

      let settings = JSON.parse(settingsString);
      if (!settings)
        return;

      if (settings.pseudo)
        this.proposedPseudo = this.pseudo = settings.pseudo || this.guid();

      if (settings.encryptMessages)
        this.encryptMessages = settings.encryptMessages || false;

      if (settings.encryptionKey)
        this.encryptionKey = settings.encryptionKey || this.guid();

      if (settings.otherEncryptionKeys && Array.isArray(this.otherEncryptionKeys))
        settings.otherEncryptionKeys.forEach(element => this.otherEncryptionKeys.push(element));

      if (settings.desiredNbIncomingPeers)
        this.desiredNbIncomingPeers = settings.desiredNbIncomingPeers || 3;

      if (settings.desiredNbOutgoingPeers)
        this.desiredNbOutgoingPeers = settings.desiredNbOutgoingPeers || 3;

      if (settings.miningDifficulty)
      this.miningDifficulty = settings.miningDifficulty;
      this.autoP2P = !!settings.autoP2P;
      this.autoSave = !!settings.autoSave;
      this.autoStart = !!settings.autoStart;
      console.log(`preferences loaded`);
    }
    catch (e) {
      console.log(`error loading preferences`);
    }
  }

  private async tryLoadBlocksFromLocalStorage() {//this loads the messages saved in blocks from local storage
    let storageBlocksString = localStorage.getItem(STORAGE_BLOCKS);
    if (storageBlocksString) {
      try {
        let storageBlocks = JSON.parse(storageBlocksString);
        if (Array.isArray(storageBlocks)) {
          console.log(`loading blocks from local storage`);
          let i = 0;
          for (let { blockId, block } of storageBlocks) {
            this.fullNode.node.registerBlock(blockId, block);
            i++;
            if (i % 2 == 0)//if there are no blocks left then stop data 
              await sleep(20);
          }
          console.log(`blocks restored from local storage`);
        }
      }
      catch (e) {
        console.log(`error loading from local storage : ${e}`);
      }
    }
  }

  saveBlocks() {//this saved the block inside the chain
    let toSave = [];
    let blocks: Map<string, Block.Block> = this.fullNode.node.blocks();
    blocks.forEach((block, blockId) => toSave.push({ blockId, block }));
    localStorage.setItem(STORAGE_BLOCKS, JSON.stringify(toSave));
    console.log(`blocks saved`);
  }
/////////////////
ngOnInit() {}  
}