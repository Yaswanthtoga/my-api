const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const climateRouter = require('./routes/climateRoutes.js');
const errorHandler = require('./error_handler/errorHandler.js');


// Connecting to the mongodb { since both containers will be running in a same network, so the domain will be named as it's container name }
mongoose.connect('mongodb://db:27017/climatedb')
  .then(()=>console.log('mongodb connected'))
  .catch((err)=>console.log(err))

const app = express();

//Middlewares
app.use(morgan('combined'));
app.use(express.json());
app.use('/api/',climateRouter);

// Middleware for error-handler
app.use(errorHandler)

app.listen(3000,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Server Started at 3000");
    }
})