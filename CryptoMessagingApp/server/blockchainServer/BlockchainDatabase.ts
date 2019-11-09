import { app } from "@arkecosystem/core-container";
//this allows for accesing blocks by interacting with the database and accesing transactions from the blockchain database.
const database = app.resolvePlugin("database");
async function callDatabaseMethods() {
// Get a block from the database by its id
await database.getBlock("some block id");
// Skip the first 100 blocks, grab the next 100
await database.getBlocks(100, 100);
// Grab blocks at height 1, 5 and 10
await database.getBlocksByHeight([1, 5, 10]);
// Get all blocks that have been forged in round 10
await database.getBlocksForRound(10);
// Get the last block we've received
await database.getLastBlock();
// Get the last 10 blocks we've received
await database.getRecentBlockIds();
// Get a transaction from the database by its id
await database.getTransaction("some transaction id");
}callDatabaseMethods();