var https = require('https');
var request = require('request');

// Running the program every two seconds
setInterval(() => {
  // URL to be used for data
  var url = 'https://interview.adpeai.com/api/v1/get-task';
  https.get(url, function(res){
    var body = '';
    // Appending data together
    res.on('data', function(chunk){
        body += chunk;
    });
    // On the end of appending the data we parse the body and send it along to the post request function
    res.on('end', function(){
        var response = JSON.parse(body);
        postReq(response)
    });
  }).on('error', function(err){
      console.log("Error: ", err);
  });
}, 2000);

function postReq(responseBody) {
  var resultAnswer = getResults(responseBody)
  // Making request to server with the id and result of the operation used
  request({
    url: "https://interview.adpeai.com/api/v1/submit-task",
    method: "POST",
    json: true,
    body: {id: responseBody.id, result: resultAnswer}
  }, function (error, response, body){
      console.log('response ', body)
      // Output for status results 200, 400 and 500
      if(response.statusCode === 200) {
        console.log(`The post request status code is: ${response.statusCode}`);
      }
      if(response.statusCode === 400) {
        console.log(`The post request status code is: ${response.statusCode}`);
      }
      if(response.statusCode === 500) {
        console.log(`The post request status code is: ${response.statusCode}`);
      }
  });
}

function getResults(body) {
  // Using the operation specified in the body we return the appropriate result
  if(body.operation === 'addition') {
    return body.left + body.right;
  }
  if(body.operation === 'subtraction') {
    return body.left - body.right;
  }
  if(body.operation === 'remainder') {
    return body.left % body.right;
  }
  if(body.operation === 'division') {
    return body.left / body.right;
  }
  if(body.operation === 'multiplication') {
    return body.left * body.right;
  }
}