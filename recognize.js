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

  imgur.uploadUrl(url)
  .then(function (json) {
      let { link } = json.data
      console.log(link);
      client.tagFromUrls('image', link, function(err, results) {
        console.log(results)
      })
  })
  .catch(function (err) {
      console.error(err.message);
  });

  // client.tagFromUrls('image', url, function(err, results) {
  //   console.log(results)
  // })
  // request({
  //   uri: attachment.payload.url,
  //   method: 'GET',
  //   encoding: null
  // }, (err, res, data) => {
  //   if (err) return cb(err)
  //
  //   console.log('data: ', data)
  //
  //   var recognizeStream = speech_to_text.createRecognizeStream(params);
  //   recognizeStream.setEncoding('utf8');
  //   recognizeStream.on('results', (data) => {
  //     console.log('hi')
  //     if(data && data.results && data.results.length>0 && data.results[0].alternatives && data.results[0].alternatives.length>0){
  //       var result = data.results[0].alternatives[0].transcript;
  //       console.log("result: ",result);
  //     }
  //   })
    // request({
    //   uri: `http://${opts.host}/v1/identify`,
    //   method: 'POST',
    //   formData: {
    //     access_key: opts.key,
    //     data_type: 'audio',
    //     sample_bytes: audio.length,
    //     sample: audio,
    //     signature_version: 1,
    //     signature: signature,
    //     timestamp: timestamp
    //   },
    //   json: true
    // }, (err, res, body) => {
    //   if (err) return cb(err)
    //
    //   if (body.status.code !== 0) {
    //     return cb({message: 'NO_MATCH'})
    //   }
    //
    //   let song = body.metadata.music[0]
    //   if (song.external_metadata && song.external_metadata.spotify) {
    //     request({
    //       uri: `https://api.spotify.com/v1/tracks/${song.external_metadata.spotify.track.id}`,
    //       method: 'GET',
    //       json: true
    //     }, (err, res, body) => {
    //       if (err) return cb(err)
    //
    //       return cb(null, {
    //         title: song.title,
    //         artist: song.artists[0].name,
    //         album_art: body.album.images[0].url,
    //         spotify: body.external_urls.spotify,
    //         youtube: (song.external_metadata.youtube ? `https://www.youtube.com/watch?v=${song.external_metadata.youtube.vid}` : null)
    //       })
    //     })
    //   } else {
    //     return cb(null, {
    //       title: song.title,
    //       artist: song.artists[0].name
    //     })
    //   }
    // })
  // })
}
