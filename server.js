const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.get('/testimonials/random', (req, res) => {
  res.json(db[Math.floor(Math.random() * db.length)]);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db[db.findIndex(i => i.id == req.params.id)]);
});

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.post('/testimonials', (req, res) => {
  db.push({id: uuidv4(), author: req.body.author, text:  req.body.text});
  res.json({message: 'OK'});
});

app.put('/testimonials/:id', (req, res) => {
  db[db.findIndex(i => i.id == req.params.id)] = {id: req.params.id, author: req.body.author, text:  req.body.text};
  res.json({message: 'OK'});
});

app.delete('/testimonials/:id', (req, res) => {
  db.splice(db.findIndex(i => i.id == req.params.id), 1);
  res.json({message: 'OK'});
});

app.use((req, res) => {
  res.status(404).json({ "message": "Not found..."});
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
