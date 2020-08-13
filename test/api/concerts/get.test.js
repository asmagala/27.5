const chai = require('chai');
const chaiHttp = require('chai-http');
const Concert = require('../../../models/concert.model');
const server = require('../../../server');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;
const mongoose = require('mongoose');

describe('GET /api/concerts', () => {

  before(async () => {
    const testConcertOne = new Concert(
      {
         _id: '5d9f1140f10a81216cfd4408', 
         performer: 'Performer 1',
         genre: 'Genre 1', 
         price: 35,day: 1,
         image: 'images/img.jpg'
      });
    await testConcertOne.save();
  
    const testConcertTwo = new Concert(
      { 
        _id: '5d9f1159f81ce8d1ef2bee48', 
        performer: 'Performer 2',
        genre: 'Genre 2', 
        price: 55,
        day: 2,
        image: 'images/img.jpg'
      });
    await testConcertTwo.save();

    const testConcertThree = new Concert(
      { 
        _id: '5d9f1159f81ce8d1ef2bee49', 
        performer: 'Performer 2',
        genre: 'Genre 1', 
        price: 45,
        day: 2,
        image: 'images/img.jpg'
      });
    await testConcertThree.save();

    const testConcertFour = new Concert(
      { 
        _id: '5d9f1159f81ce8d1ef2bee50', 
        performer: 'Performer 1',
        genre: 'Genre 2', 
        price: 15,
        day: 3,
        image: 'images/img.jpg'
      });
    await testConcertFour.save();
  });
  
  after(async () => {
    await Concert.deleteMany();
    mongoose.models = {};
  });

  it('should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(4);
  });

  it('should return concerts by performer ', async () => {
    const res = await request(server).get('/api/concerts/performer/Performer 1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);

  });

  it('should return concerts by genre', async () => {
    const res = await request(server).get('/api/concerts/genre/Genre 1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('should return concerts by range of price', async () => {
    const res = await request(server).get('/api/concerts/price/10/50');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(3);
  });

  it('should return all concerts - range of price min / max', async () => {
    const res = await request(server).get('/api/concerts/price/15/55');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(4);
  });

  it('should return all concerts in spite of changeing min with max price', async () => {
    const res = await request(server).get('/api/concerts/price/55/15');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(4);
  });

  it('should return concerts that are on the day 1', async () => {
    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  });

});