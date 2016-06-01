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
let data = {
  imgur: '',
  clarifai: ''
}

bot.on('error', (err) => {
  console.log(err.message)
})

bot.on('message', (payload, reply) => {
  console.log('Received message from ' + payload.sender.id)
  if (payload.message.attachments && payload.message.attachments[0] && payload.message.attachments[0].type == 'image') {
    console.log('received img')
    recognizeImage({
      message: payload.message
    }, (err, img) => {
      if (err) {
        console.log(err)
        return
      }
      if (err) throw err

      data.clarifai = img.id
      data.imgur = img.imgur_url
    })


    let element = {
      title: 'Send it to...',
      buttons: [{
        type: 'postback',
        title: 'Imgur',
        payload: 'imgur'
      },{
        type: 'postback',
        title: 'Clarifai',
        payload: 'clarifai'
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
  }

})

bot.on('postback',(fullpayload,reply) => {
  let payload = fullpayload.postback.payload
  console.log(payload)
  if (payload =='clarifai'){
    console.log('user selected clarifai')

    setTimeout(()=>{
        reply({ text: 'This is a ' + data.clarifai})
    },1500)
  }
  if (payload =='imgur'){
    console.log('user selected imgur')
    reply({ text: 'Uploading to imgur...' })
    let element = {
        title: 'Uploaded to Imgur!',
      image_url: data.imgur,
      buttons: [{
        type: 'web_url',
        title: 'Imgur link',
        url: data.imgur
      }]
    }
    setTimeout(()=>{
        reply({
          attachment: {
            type: 'template',
            payload: {
              template_type: 'generic',
              elements: [element]
            }
          }
        })
    },1500)

  }

})

http.createServer(bot.middleware()).listen(process.env.PORT || 3000, () => console.log('Server running on http://localhost:3000'))
