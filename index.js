'use strict'
const http = require('http')
const Bot = require('messenger-bot')
var recognizeImage = require('./recognize')

//activate webhook
// curl -X POST "https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=CAAWgJ8SZC4ycBAPETX5xpqw1DgbCni1BUYlTllHyfzTxIr8Vp3MTnfE66IN73Rq794B3BTfbp3voL3T7fsEa7lAKmmA9davEQv9sVxZBfZBm5XvaRsEZA8qlV9hhZAgsnjgnjQfk6U9oFsJL7gTikSZBGdXczobMMhY3gacn89p3MXkHbEdZCnJDyjem0S7qPo6OM1CI4ERBQZDZD"
// Edit these with your tokens
const FB_TOKEN = 'CAALZCGZCD9zn4BADWjDmDFZBMHXnyeZADYjcvZC9qlxd0WlIZA8qnUbyTkUsuyZCZAwYpr2de7VUfuGBezjqlBCPnj413xUSdogH5gspqKG2hpomxhIKfVheoRaw58ZBPaXwfpCYq5LzsyJTDx4nBo4j91WwWtnVVR0vUmZBOl4KFaedlVOXJYiSS9gfVdMJ3rxGjuP5ZAEpd7CfQZDZD'
const FB_VERIFY = 'Verify123'
const ACR_ACCESS_KEY = '0c3fd7342e0c1be74392a28ad38037d3'
const ACR_ACCESS_SECRET = 'Q1lH4qZXZ8QS3A42MHXWzoCDtNXLrc240q8OBxC4'
const ACR_HOST = 'ap-southeast-1.api.acrcloud.com'

let bot = new Bot({
  token: FB_TOKEN,
  verify: FB_VERIFY
})

bot.on('error', (err) => {
  console.log(err.message)
})

bot.on('message', (payload, reply) => {
  console.log('Received message from ' + payload.sender.id)
  if (!payload.message.attachments || !payload.message.attachments[0] || payload.message.attachments[0].type !== 'image') {
    return reply({
      text: 'That\'s not an iamge. Send me an image!'
    })
  }

  reply({ text: 'Analyzing image... this might take a few seconds.' })
  recognizeImage({
    message: payload.message
  }, (err, song) => {
    if (err) {
      return reply({
        text: 'I couldn\'t identify the image with Clarifai.'
      })
    }
    if (err) throw err

    let element = {
      title: 'sampletitle',
      subtitle: 'subtitle',
      image_url: null || null,
      buttons: [{
        type: 'web_url',
        title: 'link',
        url: 'https://google.com/search?q=placeholder'
      }]
    }

    // if (song.spotify) {
    //   element.buttons.push({
    //     type: 'web_url',
    //     title: 'Listen on Spotify',
    //     url: song.spotify
    //   })
    // } else {
    //   element.buttons.push({
    //     type: 'web_url',
    //     title: 'Search for song',
    //     url: `https://google.com/search?q=${song.artist} ${song.title}`
    //   })
    // }
    //
    // if (song.youtube) {
    //   element.buttons.push({
    //     type: 'web_url',
    //     title: 'Watch music video',
    //     url: song.youtube
    //   })
    // }

    reply({
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [element]
        }
      }
    })
  })
})

http.createServer(bot.middleware()).listen(process.env.PORT || 3000, () => console.log('Server running on http://localhost:3000'))
