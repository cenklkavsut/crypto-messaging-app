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
}//npm start ,yarn relay:devnet and sudo npm serve