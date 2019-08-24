import { createServer, mountServer } from "@arkecosystem/core-http-utils";

export async function startServer(config) {
  const server = await createServer({
    host: config.host,
    port: config.port
  });//change the server to process messages
//this allows for requesting data from core and allows to make use of the data for the app and exposes an api to requist data
   server.route({
    method: "POST",//GET
    path: "/",
    handler(request, h) {//it will send to person and to the blockchain
      return "POST";//this should return the message and user name over sockets and something else to send back to the client
    }//recieve store recieved in a array send it to the client and to the blockchain
  });

  return mountServer("My HTTP Server", server);//this is also the server for the application
}
startServer({ host: "localhost", port: 4003 });//change this port