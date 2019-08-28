var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
//var GraphQLDate = require('graphql-date');
var BookModel = require('../models/Book');
 
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
        currentRoom: {
          type: GraphQLString
        },
        recipient: {
          type: GraphQLString
        },
        sender: {
          type: GraphQLString
        },
        passpharse: {
          type: GraphQLString
        },
       /* updated_date: {
          type: GraphQLDate
        }*/
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
              },
              currentRoom: {
                type: new GraphQLNonNull(GraphQLString)
              },
              recipient: {
                type: new GraphQLNonNull(GraphQLString)
              },
              sender: {
                type: new GraphQLNonNull(GraphQLString)
              },
              passpharse: {
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
              },
              currentRoom: {
                type: new GraphQLNonNull(GraphQLString)
              },
              recipient: {
                type: new GraphQLNonNull(GraphQLString)
              },
              sender: {
                type: new GraphQLNonNull(GraphQLString)
              },
              passpharse: {
                type: new GraphQLNonNull(GraphQLString)
              }
          },
          resolve(root, params) {
            return BookModel.findByIdAndUpdate(params.id, { username: params.username, password: params.password, currentRoom: params.currentRoom, recipient: params.recipient,sender: params.sender, passpharse: params.passpharse/*, updated_date: new Date()*/}, function (err) {
              if (err) return next(err);
            });
          }
        },
        removeBook: {
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
        }
      }
    }
  });  
  module.exports = new GraphQLSchema({query: queryType, mutation: mutation});