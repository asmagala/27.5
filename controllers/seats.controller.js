const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch(err) {
    res.status(500).json(err); 
  }
}

exports.getRandom = async (req, res) => {
  try {
    const count = await Seat.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const item = await Seat.findOne().skip(rand);
    if(!item) res.status(404).json({message: 'Not found...' });
    else res.json(item);
  } catch(err) {
    res.json(err);
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await Seat.findById(req.params.id);
    if(!item) res.status(404).json({message: 'Not found...'})
    else res.json(item);
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.post = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const newSeat = new Seat({day: day, seat: seat, client: client, email: email});
    await newSeat.save();
    const io = req.io;
    io.emit('seatsUpdated');
    res.json({ message: 'OK' });
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.put = async (req, res) => {
  try {
    const { client, email, day, seat } = req.body;
    const item = await(Seat.findById(req.params.id));
    if (item) {
      item.client = client;
      item.email = email;
      item.day = day;
      item.seat = seat;
      await (item.save());
      res.json(await Seat.find());
    } else res.status(404).json({ message: 'Not found...'});
  } catch(err) {
    res.status(500).json(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await(Seat.findById(req.params.id));
    if(item) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json(await Seat.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  } catch(err) {
    res.status(500).json(err);
  }
};
