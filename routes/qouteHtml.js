const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/quote-page', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

    
module.exports=router;