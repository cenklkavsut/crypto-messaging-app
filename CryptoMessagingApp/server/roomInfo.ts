class roominfo{
roomNames:string;
roomLists = new Array<string>();//this list contains room names

constructor(){}

addRoom(name:string){
    this.roomLists.push(name);  
}

roomUse():string{
    for (var i = 0; i < this.roomLists.length; i++) 
    {
     this.roomNames=this.roomLists[i];
     i+=1;
      return this.roomNames;//list all rooms by looping through
     } 
   }
}
  //here add a way to send to the blockchain
  /*identities.address.fromPassphrase(this.passPhrase);
  identities.publicKey.fromPassphrase(this.passPhrase);//add signature and passprase to the ui   
  identities.privateKey.fromPassphrase(this.passPhrase);//private key for the transaction
  identities.address.validate("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib"); 
  identities.publicKey.validate("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
  identities.publicKey.validate(this.passPhrase);*/
/*crypto.verifyHash(signed.hash,signed.signature,"034151a3ec46b5670a682b0a63394f863587d1bc97483b1b");*/

/*Looking for "tsconfig.json" files..
Found "tsconfig.json" file: /Users/myapp/Downloads/project/CryptoMessagingApp/CryptoMessagingApp/tsconfig.json
Found "tsconfig.json" file: /Users/myapp/Downloads/project/CryptoMessagingApp/CryptoMessagingApp/e2e/tsconfig.json
Found "tsconfig.json" file: /Users/myapp/Downloads/project/CryptoMessagingApp/CryptoMessagingApp/node_modules/chrome-trace-event/tsconfig.json
Found "tsconfig.json" file: /Users/myapp/Downloads/project/CryptoMessagingApp/node-graphql/server/node_modules/sift/tsconfig.json
Found "tsconfig.json" file: /Users/myapp/Downloads/project/CryptoMessagingApp/node-graphql/server/node_modules/uri-js/tsconfig.json
Found "tsconfig.json" file: /Users/myapp/Downloads/project/CryptoMessagingApp/CryptoMessagingApp/node_modules/webdriver-js-extender/tsconfig.json
Found "tsconfig.json" file: /Users/myapp/Downloads/project/CryptoMessagingApp/CryptoMessagingApp/node_modules/typed-graphql/tsconfig.json
Found "tsconfig.json" file: /Users/myapp/Downloads/project/CryptoMessagingApp/CryptoMessagingApp/node_modules/uri-js/tsconfig.json
Found "tsconfig.json" file: /Users/myapp/Downloads/project/CryptoMessagingApp/CryptoMessagingApp/node_modules/blocking-proxy/tsconfig.json
Found "tsconfig.json" file: /Users/myapp/Downloads/project/CryptoMessagingApp/CryptoMessagingApp/node_modules/protractor/tsconfig.json
Found "tsconfig.json" file: /Users/myapp/Downloads/project/CryptoMessagingApp/CryptoMessagingApp/node_modules/ts-invariant/tsconfig.json
Found "tsconfig.json" file: /Users/myapp/Downloads/project/CryptoMessagingApp/CryptoMessagingApp/node_modules/hyperid/test/tsconfig.json
Failed to parse JSON file: /Users/myapp/Downloads/project/CryptoMessagingApp/CryptoMessagingApp/node_modules/hyperid/test/tsconfig.json. Error: Unexpected token } in JSON at position 114
Found "tsconfig.json" file: /Users/myapp/Downloads/project/CryptoMessagingApp/CryptoMessagingApp/node_modules/rxjs/src/tsconfig.json
Found "tsconfig.json" file: /Users/myapp/Downloads/project/CryptoMessagingApp/CryptoMessagingApp/node_modules/log4js/types/tsconfig.json
Found "tsconfig.json" file: /Users/myapp/Downloads/project/CryptoMessagingApp/CryptoMessagingApp/node_modules/@wry/equality/tsconfig.json
Found "tsconfig.json" file: /Users/myapp/Downloads/project/CryptoMessagingApp/CryptoMessagingApp/node_modules/@wry/context/tsconfig.json
Found "tsconfig.json" file: /Users/myapp/Downloads/project/CryptoMessagingApp/CryptoMessagingApp/node_modules/protractor/exampleTypescript/tsconfig.json
Found "tsconfig.json" file: /Users/myapp/Downloads/project/CryptoMessagingApp/CryptoMessagingApp/node_modules/fastq/test/tsconfig.json
Failed to parse JSON file: /Users/myapp/Downloads/project/CryptoMessagingApp/CryptoMessagingApp/node_modules/fastq/test/tsconfig.json. Error: Unexpected token } in JSON at position 114
Found "tsconfig.json" file: /Users/myapp/Downloads/project/CryptoMessagingApp/CryptoMessagingApp/node_modules/apollo-server-caching/src/__tests__/tsconfig.json
Failed to parse JSON file: /Users/myapp/Downloads/project/CryptoMessagingApp/CryptoMessagingApp/node_modules/apollo-server-caching/src/__tests__/tsconfig.json. Error: Unexpected token ] in JSON at position 143
Found "tsconfig.json" file: /Users/myapp/Downloads/project/CryptoMessagingApp/CryptoMessagingApp/node_modules/socketcluster/node_modules/rxjs/src/tsconfig.json
Found "tsconfig.json" file: /Users/myapp/Downloads/project/CryptoMessagingApp/CryptoMessagingApp/node_modules/socketcluster/sample/node_modules/rxjs/src/tsconfig.json
Found "tsconfig.json" file: /Users/myapp/Downloads/project/CryptoMessagingApp/CryptoMessagingApp/node_modules/socketcluster/sample/node_modules/socketcluster/sample/node_modules/rx/ts/tsconfig.json
Watching for file changes..*/