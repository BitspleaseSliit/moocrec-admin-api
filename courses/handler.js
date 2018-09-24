'use strict';

var mongoose = require('mongoose');

var config = require('../config/database');
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


module.exports.getCoursesByLogo = (event, context, callback) => {
  
  console.log('getCoursesByLogo(logo)');

  Course.find({ logo: event.pathParameters.logo }).exec().then(function(courses) {

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

module.exports.saveCourses = (event, context, callback) => {
  
  console.log('saveCourses()');

  const data = JSON.parse(event.body);

  const course = new Course({
    name: data.name,
    provider: data.provider,
    courseUrl: data.courseUrl,
    logo: data.logo,
    path: data.path,
    download: data.download
  });

  course.save().then(function(courses) {

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


module.exports.updateCourses = (event, context, callback) => {
  
  console.log('updateCourses()');

  const data = JSON.parse(event.body);
  const id = event.pathParameters.id;

  const course = new Course({
    name: data.name,
    provider: data.provider,
    courseUrl: data.courseUrl,
    logo: data.logo,
    path: data.path,
    download: data.download,
    processed: data.processed
  });

  Course.findByIdAndUpdate(id, { $set: { 
    name: data.name,
    provider: data.provider,
    courseUrl: data.courseUrl,
    logo: data.logo,
    path: data.path,
    download: data.download,
    processed: data.processed
  }
  }).then(function(courses) {

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
