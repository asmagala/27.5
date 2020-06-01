// concerts.routes.js

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const db = require('./../data/db');

router.use(express.urlencoded({extended: false}));
router.use(express.json());

router.get('/concerts/:id', (req, res) => {
    res.json(db.concerts[db.concerts.findIndex(i => i.id == req.params.id)]);
  });
  
  router.get('/concerts', (req, res) => {
    res.json(db.concerts);
  });
  
  router.route('/concerts').post((req, res) => {
    console.log(req);
    db.concerts.push({id: uuidv4(), performer: req.body.performer, genre:  req.body.genre, price: req.body.price, day: req.body.day, image: req.body.image});
    res.json({message: 'OK'});
  });
  
  router.put('/concerts/:id', (req, res) => {
    db.concerts[db.concerts.findIndex(i => i.id == req.params.id)] = {id: req.params.id, performer: req.body.performer, genre:  req.body.genre, price: req.body.price, day: req.body.day, image: req.body.image};
    res.json({message: 'OK'});
  });
  
  router.delete('/concerts/:id', (req, res) => {
    const idSent = db.concerts.findIndex(i => i.id == req.params.id);
    if (idSent >= 0)
    {
      db.concerts.splice(idSent, 1);
    }
    res.json({message: 'OK'});
  });
  
module.exports = router;