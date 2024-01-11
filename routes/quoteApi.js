const express = require('express');
const router = express.Router();
const path = require('path');
const Quote = require('../models/quote');

const sampleQuotes = [
    { text: 'The only limit to our realization of tomorrow will be our doubts of today.', author: 'Franklin D. Roosevelt' },
    { text: 'Life is what happens when you’re busy making other plans.', author: 'John Lennon' },
    {text: 'It is dangerous to be right in matters on which the established authorities are wrong.', author:'Voltaire'},
    {text: 'Adventure is worthwhile in itself.', author:'Amelia'},
    {text: 'Listening well is as powerful as talking well, and is also as essential to true conversation.', author:'Chinese Proverb'},
    {text: 'It is indeed a radical act of love just to sit down and be quiet for a time by yourself.', author:'Jhon'},
    {text: 'Have a vision, trust yourself, break some rules, ignore the naysayers, dont be afraid to fail.', author:'Arnold'},
    {text: 'If youve never eaten while crying you don t know what life tastes like.', author:'JohnDeer'},
    {text: 'Reality is nothing but a collective hunch.', author:'winsdon'},
    {text: 'To the world you may be one person; but to one person you may be the world.', author:'seuss'},
    {text: 'We are like islands in the sea, separate on the surface but connected in the deep.', author:'William James'},
    {text: 'Hope is the Good Thing, May be the best of thing, Good things never dies', author:'Stephen King'},
  ];
  
  Quote.insertMany(sampleQuotes)
  .then(() => {
    console.log('Sample quotes inserted successfully');
  })
  .catch((err) => {
    console.error('Error inserting sample quotes:', err);
  });


  router.get('/quote', async (req, res) => {
    try {
        const { author } = req.query;
        let query = {};

        if (author) {
            query = { author: new RegExp(author, 'i') };
        }
      const randomQuote = await Quote.aggregate([ { $match: query }, {$sample: { size: 1 }} ]);
      res.json(randomQuote);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
 



  
module.exports=router;