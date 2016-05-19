'use strict'
// const crypto = require('crypto')
// const request = require('request')
// const config = require('./config')
// var firebase = require('firebase');

// var app = firebase.initializeApp(config.firebase_config);

let uid = '1231232123141'

function createNewLink(uid, link){
  firebase.database().ref('links/' + Date.now()).push({
    link: link,
    uid: uid
  })
}
