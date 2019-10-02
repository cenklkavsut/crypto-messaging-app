//yarn relay:devnet and sudo npm serve,the server requires mongodb and monogoose to be installed and can be runned through npm start
//the app uses mongodb and graphql 
//where = _id ? {_id} : {};return Todo.find(where)                    
//const user =  await BookModel.findOne({where:{username:params.username}}).exec();
//const valid = await BookModel.findOne({where:{password:params.password}}).exec();
 //if(!user||!valid){return decider;}else if (user.password===valid&&valid.username==user){return true; }
//const user = await BookModel.findOne({where:{username:params.username,password: params.password }}).exec();
//if(!user){return decider;}else{return user; }
/* const user = await BookModel.User.findOne({ where: { username:params.username } });if (!user) {throw new Error(decider);}
const valid = await bcrypt.compare(password, user.password);if (!valid) {throw new Error(decider);}
const token = jwt.sign({user: _.pick(user, ['_id', 'username'])});      
return token; try{const decider= new Error('Invalid details please check your details again!');
const user = await BookModel.findOne({ where: { username:params.username } });
if (!user) {throw new Error(decider);}const valid = params.password;
if (!valid) {throw new Error(decider);}else if(pass=== user.password){return true;} }catch(decider) {return decider;}*/