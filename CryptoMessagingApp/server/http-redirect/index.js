let http = require('http')
let httpPort = (process.argv.length >= 3 && parseInt(process.argv[2])) || 4200

http.createServer((request, response) => {
    response.writeHead(302, { 'Location': 'http://localhost:4200/chat' })
    response.end()
}).listen(httpPort)

console.log(`listening http on ${httpPort}`)