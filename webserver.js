/* 
Source file: webserver.js

Description: A simple webserver, written in node.js

---
Copyright (c) 2012 All Right Reserved, C. A. Cois
http://www.codehenge.net

THIS CODE AND INFORMATION ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY 
KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
PARTICULAR PURPOSE.

Node.js is an official trademark of Joyent. This software is not 
formally related to or endorsed by the official Joyent Node.js open 
source or commercial project.
*/

var http = require('http')
, url = require('url')
, fs = require('fs')
, server;

server = http.createServer(function(req, res){
// parse the pathname as a url
var path = url.parse(req.url).pathname;
                   
switch (path){
    
    case '/test':
        res.writeHead(200, {'Content-Type': 'text/plain'});
    	res.write('It works!\n');
    	res.end();
	
	// serve up our html chat client file by writing it directly to the response
	case '/':
		fs.readFile(__dirname + '/index.html', function(err, data){
	    	if (err) return send404(res);
	        	res.writeHead(200, {'Content-Type': 'text/html'})
	            res.write(data, 'utf8');
	            res.end();
	     });	
	case '/twitter':
		fs.readFile(__dirname + '/twitter.html', function(err, data){
	    	if (err) return send404(res);
	        	res.writeHead(200, {'Content-Type': 'text/html'})
	            res.write(data, 'utf8');
	            res.end();
	     });
    break;
    
    default: send404(res);
}
}), 

send404 = function(res){
    res.writeHead(404);
    res.write('404');
    res.end();
};

server.listen(8080);
