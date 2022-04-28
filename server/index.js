const express = require('express');
const path = require('path')

const app = express()

app.use(express.json())


// include and initialize the rollbar library with your access token
var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '1843678992f64c5582e1711d6a22aaf6',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '../index.html'))
})
app.get('/css', (req, res) => {
    res.sendFile(path.join(__dirname,'../styles.css'))
    rollbar.warning("CSS doesn't exist")
})

app.get('/test', () => {try{
  banana()
} catch(error){rollbar.error(error)}})

app.get('/banana', () => {try{
    banana()
  } catch(error){rollbar.critical("Function does not exist")}})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

const port = process.env.PORT || 4545
app.use(rollbar.errorHandler())
app.listen(port, ()=> console.log(`Listening on ${port}`)) 
















