// testimonials.routes.js

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const db = require('./../data/db');

router.use(express.urlencoded({extended: false}));
router.use(express.json());

router.get('/testimonials/random', (req, res) => {
    res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
  });
  
  router.get('/testimonials/:id', (req, res) => {
    res.json(db.testimonials[db.testimonials.findIndex(i => i.id == req.params.id)]);
  });
  
  router.get('/testimonials', (req, res) => {
    res.json(db.testimonials);
  });
  
  router.post('/testimonials', (req, res) => {
    db.testimonials.push({id: uuidv4(), author: req.body.author, text:  req.body.text});
    res.json({message: 'OK'});
  });
  
  router.put('/testimonials/:id', (req, res) => {
    db.testimonials[db.testimonials.findIndex(i => i.id == req.params.id)] = {id: req.params.id, author: req.body.author, text:  req.body.text};
    res.json({message: 'OK'});
  });
  
  router.delete('/testimonials/:id', (req, res) => {
    const idSent = db.testimonials.findIndex(i => i.id == req.params.id);
    if (idSent >= 0)
    {
      db.testimonials.splice(idSent, 1);
    }
    res.json({message: 'OK'});
  });

module.exports = router;