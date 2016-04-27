'use strict'
const crypto = require('crypto')
let timestamp = Date.now()
let signingString = `POST\n/v1/identify\n0c3fd7342e0c1be74392a28ad38037d3\naudio\n1\n${timestamp}`
let signature = crypto.createHmac('sha1', 'Q1lH4qZXZ8QS3A42MHXWzoCDtNXLrc240q8OBxC4').update(new Buffer(signingString, 'utf-8')).digest('base64')

console.log(timestamp)
console.log(signingString, '\n')
console.log(signature)
