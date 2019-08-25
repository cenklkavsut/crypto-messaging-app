import { app } from "@arkecosystem/core-container";
//this controls the state of your blockchain and checks if any issue or change has occured
//it allows to display the state of your database and it allows for observing the blockchain node
const blockchain = app.resolvePlugin("blockchain");
async function callBlockchainMethods() {
  // Check if the blockchain is fully synced
  blockchain.isSynced();
  // Get the last block we've received
  blockchain.getLastBlock();
  // Get the height of the last block we've received
  blockchain.getLastHeight();
  // Get the last block we've downloaded
  blockchain.getLastDownloadedBlock();
  // Get a list of events the blockchain emits
  blockchain.getEvents();
}
callBlockchainMethods();