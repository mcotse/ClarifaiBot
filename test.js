var watson = require('watson-developer-cloud');
var fs = require('fs');

var speech_to_text = watson.speech_to_text({
  username: '2cafffa7-4a4e-46c7-8992-f66100dbb758',
  password: 'f4dAYSvHcAvG',
  version: 'v1'
});

var params = {
  // From file
  audio: fs.createReadStream('./0001.flac'),
  content_type: 'audio/flac'
};

speech_to_text.recognize(params, function(err, res) {
  if (err)
    console.log(err);
  else
    console.log(JSON.stringify(res, null, 2));
});

// or streaming
fs.createReadStream('./0001.flac')
  .pipe(speech_to_text.createRecognizeStream({ content_type: 'audio/flac;'}))
  .pipe(fs.createWriteStream('./transcription.txt'));
