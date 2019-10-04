var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLID = require("graphql").GraphQLID;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt; //var GraphQLDate = require('graphql-date');
var BookModel = require("../models/Book");
var roomModel = require("../models/room");
//the book object that contains login information
var bookType = new GraphQLObjectType({
  name: "book",
  fields: function() {
    return {
      _id: {
        type: GraphQLString
      },
      username: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      }
    };
  }
});
//the room object that contains room information
var roomType = new GraphQLObjectType({
  name: "room",
  fields: function() {
    return {
      _id: {
        type: GraphQLString
      },
      currentRoom: {
        type: GraphQLString
      },
      recipient: {
        type: GraphQLString
      },
      sender: {
        type: GraphQLString
      },
      passphrase: {
        type: GraphQLString
      }
    };
  }
});
//the query allows displaying information
var queryType = new GraphQLObjectType({
  name: "Query",
  fields: function() {
    return {
      books: {
        type: new GraphQLList(bookType),
        resolve: function() {
          const books = BookModel.find().exec();
          if (!books) {
            throw new Error("Error");
          }
          return books;
        }
      },
      book: {
        type: bookType,
        args: {
          id: {
            name: "_id",
            type: GraphQLString
          }
        },
        resolve: function(root, params) {
          const bookDetails = BookModel.findById(params.id).exec();
          if (!bookDetails) {
            throw new Error("Error");
          }
          return bookDetails;
        }
      },
      rooms: {
        type: new GraphQLList(roomType),
        resolve: function() {
          const rooms = roomModel.find().exec();
          if (!rooms) {
            throw new Error("Error");
          }
          return rooms;
        }
      },
      room: {
        type: roomType,
        args: {
          id: {
            name: "_id",
            type: GraphQLString
          }
        },
        resolve: function(root, params) {
          const roomDetails = roomModel.findById(params.id).exec();
          if (!roomDetails) {
            throw new Error("Error");
          }
          return roomDetails;
        }
      },
      roomsName: {
        type: roomType,
        args: {
          currentRoom: { type: new GraphQLNonNull(GraphQLString) },
          recipient: { type: new GraphQLNonNull(GraphQLString) },
          sender: { type: new GraphQLNonNull(GraphQLString) },
          passphrase: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: async function(root, params) {
          //this will retun back all room names
          const roomDetail = await roomModel.find({
            currentRoom: params.currentRoom
          });
          return roomDetail.toString();
        }
      }
    };
  }
});

module.exports = new GraphQLSchema({ query: queryType }); //this allows to use it in the schema
//this is a mutation that allows for interacting data
var mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: function() {
    return {
      addBook: {
        //this allows to add a book
        type: bookType,
        args: {
          username: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: function(root, params) {
          const bookModel = new BookModel(params);
          const newBook = bookModel.save();
          if (!newBook) {
            throw new Error("Error");
          }
          return newBook;
        }
      },
      addroom: {
        //this allows to add a room
        type: roomType,
        args: {
          currentRoom: {
            type: new GraphQLNonNull(GraphQLString)
          },
          recipient: {
            type: new GraphQLNonNull(GraphQLString)
          },
          sender: {
            type: new GraphQLNonNull(GraphQLString)
          },
          passphrase: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: function(root, params) {
          const RoomModel = new roomModel(params);
          const newRoom = RoomModel.save();
          if (!newRoom) {
            throw new Error("Error");
          }
          return newRoom;
        }
      },
      updateBook: {
        //this allows to update a book by id
        type: bookType,
        args: {
          id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLString)
          },
          username: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, params) {
          return BookModel.findByIdAndUpdate(
            params.id,
            { username: params.username, password: params.password },
            function(err) {
              if (err) return next(err);
            }
          );
        }
      },
      updateRoom: {
        //this allows to update a room y id
        type: roomType,
        args: {
          id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLString)
          },
          currentRoom: { type: new GraphQLNonNull(GraphQLString) },
          recipient: { type: new GraphQLNonNull(GraphQLString) },
          sender: { type: new GraphQLNonNull(GraphQLString) },
          passphrase: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve(root, params) {
          return roomModel.findByIdAndUpdate(
            params.id,
            {
              currentRoom: params.currentRoom,
              recipient: params.recipient,
              sender: params.sender,
              passphrase: params.passphrase
            },
            function(err) {
              if (err) return next(err);
            }
          );
        }
      },
      removeBook: {
        //this allows to remove a book by id
        type: bookType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, params) {
          const remBook = BookModel.findByIdAndRemove(params.id).exec();
          if (!remBook) {
            throw new Error("Error");
          }
          return remBook;
        }
      },
      removeRoom: {
        type: roomType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, params) {
          const remRoom = roomModel.findByIdAndRemove(params.id).exec();
          if (!remRoom) {
            throw new Error("Error");
          }
          return remRoom;
        }
      },
      removeRooms: {
        type: roomType,
        args: {
          currentRoom: { type: new GraphQLNonNull(GraphQLString) },
          recipient: { type: new GraphQLNonNull(GraphQLString) },
          sender: { type: new GraphQLNonNull(GraphQLString) },
          passphrase: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: async (root, params) => {
          await roomModel.findOneAndRemove({ currentRoom: params.currentRoom });
          const boards = await roomModel.find();
          return { currentRoom: roomModel.length };
        }
      },
      updateRooms: {
        //this allows to update a certain room by room name
        type: roomType,
        args: {
          //id: {name: 'id',type: new GraphQLNonNull(GraphQLString)},
          currentRoom: { type: new GraphQLNonNull(GraphQLString) },
          recipient: { type: new GraphQLNonNull(GraphQLString) },
          sender: { type: new GraphQLNonNull(GraphQLString) },
          passphrase: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: async (root, params) => {
          await roomModel.findOneAndUpdate(
            { id: params.id },
            {
              currentRoom: params.currentRoom,
              recipient: params.recipient,
              sender: params.sender,
              passphrase: params.passphrase
            }
          );
          return params.id;
        }
      },
      loginBook: {
        //this allows to check if book contains username and password of it if it does it returns true else returns false
        type: bookType,
        args: {
          username: { type: new GraphQLNonNull(GraphQLString) },
          password: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: async function(root, params, parent, args, context) {
          //const bookModel = new BookModel(params); //this takes the parameters
          const user = await BookModel
            .findOne({
              where: { username: params.username, password: params.password }
            })
            .exec(); //this finds the username in the database
          if (!user) {
            return "there was an error when loging in Please check your details!";
          } else {
            return true;
          }
          /* const user =  await bookModel.findOne({ where: { username:params.username } });
          const valid = await bookModel.findOne({ where: {password:params.password} });     
          if (!user) {return false;}   
          const valid = await bcrypt.compare(password,user.password);         
          if (!valid) {return false;}else{return user;}*/
        }
      },
      fetchRoom: {
        //this allows to fetch a certain room by room name
        type: roomType,
        args: {
          currentRoom: { type: new GraphQLNonNull(GraphQLString) },
          recipient: { type: new GraphQLNonNull(GraphQLString) },
          sender: { type: new GraphQLNonNull(GraphQLString) },
          passphrase: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: async function(root, params) {
        return roomFetcher({currentRoom: params.currentRoom,
        recipient: this.recipientId,sender: this.SenderId, passphrase: this.passPhrase }
          );
        }
      },
      roomRetriever: {
        //this allows to check if a certain room exist
        type: roomType,
        args: {
          currentRoom: { type: new GraphQLNonNull(GraphQLString) },
          recipient: { type: new GraphQLNonNull(GraphQLString) },
          sender: { type: new GraphQLNonNull(GraphQLString) },
          passphrase: { type: new GraphQLNonNull(GraphQLString) }
        },
        resolve: async function(root, params) {}
      }
    };
  }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation }); //this allows to use it in the schema
