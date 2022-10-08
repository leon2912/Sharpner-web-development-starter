const http = require('http');

const server = http.createServer((req,res)=>{
        res.setHeader('Content_Type' , 'text/html')
        if(req.url == '/'){
        res.write('<html><head><title>Home Page</title><head><body>Welcome to Home Page</body></html>'); 
        return res.end();
        } 
        if(req.url == '/about'){
            res.write('<html><head><title>About Page</title></head><body>Welcome to About Page</body></html>'); 
            return res.end();
        } 
        if(req.url == '/node'){
            res.write('<html><head><title>Node Page</title></head><body><h3>Welcome to my Node JS Project<h3></body></html>'); 
            return res.end();
        } 
});

server.listen(4000);

