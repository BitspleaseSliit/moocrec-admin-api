'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CourseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    provider: {
        type: String
    },
    courseUrl: {
        type: String
    },
    logo: {
        type: String
    },
    path: {
        type: String
    },
    download: {
        type: Boolean,
        default: false
    },
    processed: {
        type: Boolean,
        default: false
    },
    videoStyle: {
        talkingHead: {
             type: Number   
        },
        slide: {
            type: Number   
        },
        code: {
            type: Number   
        },
        conversation: {
            type: Number   
        },
        animation: {
            type: Number
        },
        whiteboard: {
            type: Number
        }
    },
    abstractTopics: [
        {
            type: String
        }
    ],
    courseAccent: {
        type: Number
    },
    linguisticComplexity: {
        type: Number
    },
    courseScore: {
        type: Number
    }
});

var Course = mongoose.model('Course', CourseSchema);

module.exports = Course;