const http = require('http')
const fs = require('fs')

const options = {
    hostname: '127.0.0.1',
    port: 1900,
    path: '/',
    method: 'GET'
    
}

const index = fs.readFile('../login/index.html', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return data
    }
    console.log(data)
    return data
})

// Process Request 
const req = http.request(options, (res, data) => {
    console.log(`Status Code: ${res.statusCode}`)

    res.on('data', (d) => {
    process.stdout.write(d)
    })
})
   
// Create Server 
const server = http.createServer((req, res) => {
    console.log(` Request Header: ${req.header}`)
    console.log(`Request URL: ${req.url}`)
    console.log(`Request url?: ${req.url}`)
    console.log(`Request Message: ${req.statusMessage}`)
    console.log(`Request Method: ${req.method}`)
    console.log(`Request Hostname: ${req.host}`)
    console.log(`Request Body: ${req.rawHeaders}`)
    console.log(`Request Headers: ${req.headers}`)
    console.log(`\n`)
    fs.readFile(`../${req.url}`, (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.end(data)
    })

})

/*
const index2 = fs.writeFile('index.html', `${index}`, (err) => {
    if (err) {
        console.error(err)
        return
    }
})

const progressBar = require('progress')
const bar = progressBar(':bar', {total: 10})
const timer = setInterval(() => {
    bar.tick()
    if (bar.complete) {
        clearInterval(timer)
    }
}, 100)
*/

// Listen on pipeline
const listen = server.listen(options, () => {
    console.log(`Server Running at http://${options.hostname}:${options.port}/`)
})

// Close server on finish
process.on(('SIGTERM'), () => {
    server.close(() => {
        console.log('Process Termination')
    })
})
