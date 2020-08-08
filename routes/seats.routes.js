// seats.routes.js

const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const db = require('./../data/db');

router.use(express.urlencoded({extended: false}));
router.use(express.json());

router.get('/seats/:id', (req, res) => {
  res.json(db.seats[db.seats.findIndex(i => i.id == req.params.id)]);
});
  
router.get('/seats', (req, res) => {
  res.json(db.seats);
});
  
router.post('/seats', (req, res) => {
  const isBooked = db.seats.some(seatChosen => seatChosen.day == req.body.day && seatChosen.seat == req.body.seat );
  if (isBooked) {
    res.status(404).json({ message: "The slot is already taken..."});
  } else {
    db.seats.push({id: uuidv4(), day: req.body.day, seat: req.body.seat, client: req.body.client, email: req.body.email});
    const io = req.io;
    io.emit('seatsUpdated');

    res.json({message: 'OK'});
 
  }
});
  
router.put('/seats/:id', (req, res) => {
  db.seats[db.seats.findIndex(i => i.id == req.params.id)] = {id: req.params.id, day: req.body.day, seat: req.body.seat, client: req.body.client, email: req.body.email};
  res.json({message: 'OK'});
});

router.delete('/seats/:id', (req, res) => {
  const idSent = db.seats.findIndex(i => i.id == req.params.id);
  if (idSent >= 0) {
  db.seats.splice(idSent, 1);
  }
  res.json({message: 'OK'});
});

module.exports = router;