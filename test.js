var watson = require('watson-developer-cloud');
var fs = require('fs');

var speech_to_text = watson.speech_to_text({
  username: '2cafffa7-4a4e-46c7-8992-f66100dbb758',
  password: 'f4dAYSvHcAvG',
  version: 'v1'
});

var params = {
  // From file
  audio: fs.createReadStream('./audioclip-1461810758000-4893.mp4'),
  content_type: 'audio/mp4'
};
console.log(params.audio)

speech_to_text.recognize(params, function(err, res) {
  if (err)
    console.log(err);
  else
    if(res && res.results && res.results.length>0 && res.results[0].alternatives && res.results[0].alternatives.length>0){
      var result = res.results[0].alternatives[0].transcript;
      console.log("result: ",result);
    }
});
