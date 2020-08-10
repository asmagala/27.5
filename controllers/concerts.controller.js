const Concert = require('../models/concert.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const item = await Concert.findOne().skip(rand);
    if(!item) res.status(404).json({ message: 'Not found...' });
    else res.json(item);
  } catch(err) {
    res.json(err);
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await Concert.findById(req.params.id);
    if(!item) res.status(404).json({message: 'Not found...'})
    else res.json(item);
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.getByPerformer = async (req, res) => {
  try {
    res.json(await Concert.find({performer: req.params.performer}));
  } catch(err) {
    res.json(err);
  }
};

exports.getByGenre = async (req, res) => {
  try {
    res.json(await Concert.find({genre: req.params.genre}));
  } catch(err) {
    res.json(err);
  }
};

exports.getByPrice = async (req, res) => {
  try {
    let iMin = Number(req.params.price_min);
    let iMax = Number(req.params.price_max);
    if (iMin > iMax) [iMax, iMin] = [iMin, iMax];
    res.json(await Concert.find({ price: { $gte: iMin, $lte: iMax }}));
  } catch(err) {
    res.json(err);
  }
};

exports.getByDay = async (req, res) => {
  try {
    const iDay = Number(req.params.day);
    res.json(await Concert.find({day: { $eq: iDay}}));
  } catch(err) {
    res.json(err);
  }
};
//////////////////////////////////

exports.post = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({performer: performer, genre: genre, price: price, day: day, image: image });
    await newConcert.save();
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.put = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const item = await(Concert.findById(req.params.id));
    if (item) { 
      item.performer = performer;
      item.genre = genre;
      item.price = price;
      item.day = day;
      item.image = image;
      await item.save();
      res.json(await Concert.find());
    } 
    else res.status(404).json({ message: 'Not found'});
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await(Concert.findById(req.params.id));
    if(item) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json(await Concert.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  } catch(err) {
    res.status(500).json(err);
  }
};
