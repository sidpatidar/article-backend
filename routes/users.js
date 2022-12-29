var express = require('express');
var router = express.Router();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "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",
});
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/connection',async (req,res,next)=>{
 
const openai = new OpenAIApi(configuration);
const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "what is digital marketing",
  temperature: 0,
  max_tokens: 7,
}).then((response)=>{
  console.log(response.data.choices
[0]    )
  res.send("");
});

})


module.exports = router;
