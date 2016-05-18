'use strict'
const crypto = require('crypto')
const request = require('request')
const config = require('./config')
var Clarifai = require('clarifai')
var imgur = require('imgur');

var client = new Clarifai({
  id: config.id,
  secret: config.secret
})

imgur.setCredentials(config.user, config.pw, 'c43cafb08a680b5');


module.exports = function recognizeImage (opts, cb) {
  let attachment = opts.message.attachments[0]
  console.log('attachment: ', attachment)

  let { url } = attachment.payload
  console.log(url)

  //upload to imgur
  imgur.uploadUrl(url)
  .then(json => {
      let { link } = json.data
      console.log(link);
      client.tagFromUrls('image', link, ((err, results) => {
        if (results){
          console.log(results)
          let {tags} = results
          let {tags:[{ class: id }]} = results
          return cb(null,{
            'imgur_url': link,
            'id': id
          })
        }
        if (err){
          console.log(err)
        }
      }))
  })
  .catch(err => {
      console.error(err.message);
  });

}
