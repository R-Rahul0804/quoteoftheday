const express = require('express');
const path = require('path');
const app = express();
const connectMongoDb = require('./config/mongoDB');
const quoteRouter = require('./routes/quoteApi');
const quoteHtmlRouter = require('./routes/qouteHtml');

//connection to mongoDB
connectMongoDb();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); //handles the req,res object

//routes endpoints
app.use('/api',quoteRouter);
app.use('',quoteHtmlRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log(`Server is Running on ${PORT}`);
});