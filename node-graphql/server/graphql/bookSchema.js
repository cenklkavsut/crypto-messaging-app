var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;//var GraphQLDate = require('graphql-date');
var BookModel = require('../models/Book');
var roomModel = require('../models/room');//var AuthService = require('../models/auth')

 var bookType = new GraphQLObjectType({
    name: 'book',
    fields: function () {
      return {
        _id: {
          type: GraphQLString
        },
        username: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        },
      }
    }
  });

  var roomType = new GraphQLObjectType({
    name: 'room',
    fields: function () {
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
        },
      }
    }
  }); 
  
var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        books: {
          type: new GraphQLList(bookType),
          resolve: function () {
            const books = BookModel.find().exec()
            if (!books) {
              throw new Error('Error')
            }
            return books
          }
        },
        book: {
          type: bookType,
          args: {
            id: {
              name: '_id',
              type: GraphQLString
            }
          },
          resolve: function (root, params) {
            const bookDetails = BookModel.findById(params.id).exec()
            if (!bookDetails) {
              throw new Error('Error')
            }
            return bookDetails
          }
        },rooms: {
          type: new GraphQLList(roomType),
          resolve: function () {
            const rooms = roomModel.find().exec()
            if (!rooms) {
              throw new Error('Error')
            }
            return rooms
          }
        },
        room: {
          type: roomType,
          args: {
            id: {
              name: '_id',
              type: GraphQLString
            }
          },
          resolve: function (root, params) {
            const roomDetails = roomModel.findById(params.id).exec()
            if (!roomDetails) {
              throw new Error('Error')
            }
            return roomDetails
          }
        }      
      }
    }
  });

  module.exports = new GraphQLSchema({query: queryType});

  var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
      return {
        addBook: {
          type: bookType,
          args: {
            username: {
                type: new GraphQLNonNull(GraphQLString)
              },
              password: {
                type: new GraphQLNonNull(GraphQLString)
              }
          },
          resolve: function (root, params) {
            const bookModel = new BookModel(params);
            const newBook = bookModel.save();
            if (!newBook) {
              throw new Error('Error');
            }
            return newBook
          }
        },addroom: {
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
          resolve: function (root, params) {
            const RoomModel = new roomModel(params);
            const newRoom = RoomModel.save();
            if (!newRoom) {
              throw new Error('Error');
            }
            return newRoom
          }
        },
        updateBook: {
          type: bookType,
          args: {
            id: {
              name: 'id',
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
            return BookModel.findByIdAndUpdate(params.id, { username: params.username, password: params.password}, function (err) {
              if (err) return next(err);
            });
          }
        },updateRoom: {
          type: roomType,
          args: {
            id: {
              name: 'id',
              type: new GraphQLNonNull(GraphQLString)
            },
            currentRoom: { type: new GraphQLNonNull(GraphQLString) },
            recipient: { type: new GraphQLNonNull(GraphQLString) },
            sender: { type: new GraphQLNonNull(GraphQLString) },
            passphrase: { type: new GraphQLNonNull(GraphQLString) }
          },
          resolve(root, params) {
            return roomModel.findByIdAndUpdate(params.id, { currentRoom: params.currentRoom, recipient: params.recipient,sender: params.sender, passphrase: params.passphrase}, function (err) {
              if (err) return next(err);
            });
          }
        },removeBook: {
          type: bookType,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(root, params) {
            const remBook = BookModel.findByIdAndRemove(params.id).exec();
            if (!remBook) {
              throw new Error('Error')
            }
            return remBook;
          }
        },removeRoom: {
          type: roomType,
          args: {
            id: {
              type: new GraphQLNonNull(GraphQLString)
            }
          },
          resolve(root, params) {
            const remRoom = roomModel.findByIdAndRemove(params.id).exec();
            if (!remRoom) {
              throw new Error('Error')
            }
            return remRoom;
          }
        },
        loginBook: {
          type: bookType,
          args: {
            username: {
                type: new GraphQLNonNull(GraphQLString)
              },
              password: {
                type: new GraphQLNonNull(GraphQLString)
              }
          },          
          resolve: async function (root, params){
           try{ 
            const decider= new Error('Invalid details please check your details again!');
            const user = await BookModel.findOne({where:{username:params.username}}).exec();
            const valid = await BookModel.findOne({where:{password:params.password}}).exec();
           if(!user||!valid){return decider;}else if (user.password===valid){return null; }
          }catch(decider) {return decider}
          }                            
        },
        updateRooms: {
          type: roomType,
          args: {
            currentRoom: { type: new GraphQLNonNull(GraphQLString) },
            recipient: { type: new GraphQLNonNull(GraphQLString) },
            sender: { type: new GraphQLNonNull(GraphQLString) },
            passphrase: { type: new GraphQLNonNull(GraphQLString) }
          },
          resolve(root, params) {
            return roomModel.findByIdAndUpdate(params.id, { currentRoom: params.currentRoom, recipient: params.recipient,sender: params.sender, passphrase: params.passphrase}, function (err) {
              if (err) return next(err);
          });
          }
        },
        fetchRoom: {
          type: roomType,
          args: {
            currentRoom: { type: new GraphQLNonNull(GraphQLString) },
            recipient: { type: new GraphQLNonNull(GraphQLString) },
            sender: { type: new GraphQLNonNull(GraphQLString) },
            passphrase: { type: new GraphQLNonNull(GraphQLString) }
          },
          resolve:async function  (root, params, args, context) {
            return roomModel.findOne({ where: {id: args.id}}).then(roomModel => roomModel); 
            roomModel.find({id}, projections,(err, rooms) => { err ? reject(err) : resolve(todos)});             
         }
        }
      }
    }
  });

module.exports = new GraphQLSchema({query: queryType, mutation: mutation});