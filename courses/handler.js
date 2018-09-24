'use strict';

const mongoose = require('mongoose');

const config = require('../config/database');
var Course = require('../data/models/course');
var User = require('../data/models/user');

mongoose.Promise = global.Promise;

mongoose.connect(config.database);

mongoose.connection.on('connected', function () {
    console.log('Connected to database '+config.database);
});

mongoose.connection.on('error', function(err) {
    console.log('Database error ' + err);
});

module.exports.getAllCourses = (event, context, callback) => {
  
  console.log('getAllCourses()');

  Course.find().exec().then(function(courses) {

    const response = {
      statusCode: 200,
      body: JSON.stringify({courses}),
    };

    callback(null, response);

  }).catch(function(err) {
    console.error(err);

    const response = {
      statusCode: 500
    };

    callback(null, response);

  });
  
};
