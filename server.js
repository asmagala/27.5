const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

const db = require('./data/db.js');
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);

app.use(express.urlencoded({extended: false}));
app.use(express.json());

/************************ TESTIMONIALS ***************
app.get('/testimonials/random', (req, res) => {
  res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.testimonials[db.testimonials.findIndex(i => i.id == req.params.id)]);
});

app.get('/testimonials', (req, res) => {
  res.json(db.testimonials);
});

app.post('/testimonials', (req, res) => {
  db.testimonials.push({id: uuidv4(), author: req.body.author, text:  req.body.text});
  res.json({message: 'OK'});
});

app.put('/testimonials/:id', (req, res) => {
  db.testimonials[db.testimonials.findIndex(i => i.id == req.params.id)] = {id: req.params.id, author: req.body.author, text:  req.body.text};
  res.json({message: 'OK'});
});

app.delete('/testimonials/:id', (req, res) => {
  const idSent = db.testimonials.findIndex(i => i.id == req.params.id);
  if (idSent >= 0)
  {
    db.testimonials.splice(idSent, 1);
  }
  res.json({message: 'OK'});
});
*/

/*************************************** CONCERTS *
app.get('/concerts/:id', (req, res) => {
  res.json(db.concerts[db.concerts.findIndex(i => i.id == req.params.id)]);
});

app.get('/concerts', (req, res) => {
  res.json(db.concerts);
});

app.post('/concerts', (req, res) => {
  db.concerts.push({id: uuidv4(), author: req.body.author, text:  req.body.text});
  res.json({message: 'OK'});
});

app.put('/concerts/:id', (req, res) => {
  db.concerts[db.concerts.findIndex(i => i.id == req.params.id)] = {id: req.params.id, author: req.body.author, text:  req.body.text};
  res.json({message: 'OK'});
});

app.delete('/concerts/:id', (req, res) => {
  const idSent = db.concerts.findIndex(i => i.id == req.params.id);
  if (idSent >= 0)
  {
    db.concerts.splice(idSent, 1);
  }
  res.json({message: 'OK'});
});
*/
/**************************************************** SEATS */
app.get('/seats/:id', (req, res) => {
  res.json(db.seats[db.seats.findIndex(i => i.id == req.params.id)]);
});

app.get('/seats', (req, res) => {
  res.json(db.seats);
});

app.post('/seats', (req, res) => {
  db.seats.push({id: uuidv4(), author: req.body.author, text:  req.body.text});
  res.json({message: 'OK'});
});

app.put('/seats/:id', (req, res) => {
  db.seats[db.seats.findIndex(i => i.id == req.params.id)] = {id: req.params.id, author: req.body.author, text:  req.body.text};
  res.json({message: 'OK'});
});

app.delete('/seats/:id', (req, res) => {
  const idSent = db.seats.findIndex(i => i.id == req.params.id);
  if (idSent >= 0)
  {
    db.seats.splice(idSent, 1);
  }
  res.json({message: 'OK'});
});




app.use((req, res) => {
  res.status(404).json({ "message": "Not found..."});
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
