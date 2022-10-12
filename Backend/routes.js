const fs = require('fs');
const requestHandler = (req,res)=>{
    // res.setHeader('Content_Type', 'text/html')
if (req.url == '/') {
    fs.readFile('message.txt', { encoding: 'utf-8' }, (err, data) => {
        if (err) {
            console.log(err);
        }
        let body = `<html>
                <head><title>Home Page</title><head>
                <body>
                <form action="/message" method="POST">
                      <div>${data}<div>
                      <input type='text' name='message'>
                      <button type='submit'>Submit</button>
                </form>
                </body>
                </html>`
        res.write(body);
        return res.end();
        
    })
}
if (req.url == '/message' && req.method == 'POST') {
    //  res.write('<html><head><title>message Page</title></head><body>It is redirected to msg page</body></html>'); 
    const body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    })
    req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split('=')[1];
        fs.writeFile('message.txt', message, () => {
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
    })
}
}

module.exports.reqHandler = requestHandler;
