const express = require('express');
const path = require('path')

const app = express();

app.use(express.json())

var Rollbar = require('rollbar')
var rollbar = new Rollbar({
  accessToken: '1843678992f64c5582e1711d6a22aaf6',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../index.html'))
    rollbar.info('html file served successfully.')
})

// app.post('/api/student', (req, res)=>{
// //     let {name} = req.body
   
// //     try{
// //         myRoutine();
// //     } catch (e) {
        
// //         logmyErrors(e);
// //     }

// // })