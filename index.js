'use strict'
const http = require('http')
const Bot = require('messenger-bot')
var recognizeImage = require('./recognize')

//activate webhook
// curl -X POST "https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=CAALZCGZCD9zn4BACBDgLoE7NVYboCMqpQf6o9a3ZCPDOZCI7RZBZB0vePZCuaESzGG2lFAZAqrITi2qXZAY2nBf6giMu9WjbPskFINXHVk3uKzyXHYkSD0UlOtAJthZAG6kJaXha0221zi3hZAmNwt9SVvoCIYikJiqcQZCqGtGjW3glpgS0l8WDHxFQfGHRwsPPoOAD6iHhlWxQKQZDZD"
// Edit these with your tokens
const FB_TOKEN = 'CAALZCGZCD9zn4BACBDgLoE7NVYboCMqpQf6o9a3ZCPDOZCI7RZBZB0vePZCuaESzGG2lFAZAqrITi2qXZAY2nBf6giMu9WjbPskFINXHVk3uKzyXHYkSD0UlOtAJthZAG6kJaXha0221zi3hZAmNwt9SVvoCIYikJiqcQZCqGtGjW3glpgS0l8WDHxFQfGHRwsPPoOAD6iHhlWxQKQZDZD'
const FB_VERIFY = 'Verify123'

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
      title: 'Identify',
      subtitle: song.id,
      image_url: song.imgur_url || null,
      buttons: [{
        type: 'web_url',
        title: 'imgur link',
        url: song.imgur_url
      }]
    }

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
