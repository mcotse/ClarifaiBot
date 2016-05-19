'use strict'
const crypto = require('crypto')
const request = require('request')
const config = require('./config')
var firebase = require('firebase');

firebase.initializeApp(config.firebase_config);
