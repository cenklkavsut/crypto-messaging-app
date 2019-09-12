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
   }//basicly it needs a room query that canbe used together with user
}//yarn relay:devnet and sudo npm serve,the server requires mongodb and monogoose to be installed and can be runned through npm start

//fetch(`${'http://localhost:3000/graphql'}/graphql`, {method: 'POST',headers: { 'Content-Type': 'application/json' },
//body:this.checkQuery,  }).then(res => res.json()).then(res => (this.checkQuery({ currentRoom: res.data.currentRoom })
//)).catch(error => alert('error '+ error));