var RESPONSE_OK = 200;
var RESPONSE_BAD = 400;

var http = require('http');
var url = require('url');
var queryString = require('querystring');

http.createServer(serverRequester).listen(8080);

function serverRequester(request, response) {

	console.log('Incomming request');

	// Attempt to get the value of the parameter 'name'
	var name = getRequestParameterValue(request, 'name');

	if ( name ) {
		console.log('Name parameter has been successfully parsed from request');

		response.writeHead(RESPONSE_OK);

		// Output the name of the person
		response.write('<h1>Hello, ' + name + '</h1>');

	} else {
		console.log('Malformed request. No name parameter');
		response.writeHead(RESPONSE_BAD);
	}

	response.end();
}

function getRequestParameterValue(request, parameterName) {
	// Prase the URL string to get a URL object
	var parsedUrl = url.parse(request.url);
	// Get a queryString object by parsing the query string of the URL
	var queryParameters = queryString.parse(parsedUrl.query);
	
	// Paramters
	return queryParameters['name'];
}

console.log('listening on port 8080...');