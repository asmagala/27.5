import React from 'react';
import { Button, Progress, Alert } from 'reactstrap';

import './SeatChooser.scss';
import io from "socket.io-client";

//const REFRESH_INTERVAL = 2 * 1000 * 60;

class SeatChooser extends React.Component {
  
  componentDidMount() {
    const { loadSeats } = this.props;
    loadSeats();
    //this.refreshSeats = setInterval(() => loadSeats(), REFRESH_INTERVAL);

    this.socket = io.connect(process.env.NODE_ENV === "production" ? process.env.PORT : "http://localhost:8000");
    this.socket.on('seatsUpdated', () => {
      loadSeats();
    });

  }

  componentWillUnmount() {

    //clearInterval(this.refreshSeats);
  }

  isTaken = (seatId) => {
    const { seats, chosenDay } = this.props;

    return (seats.some(item => (item.seat === seatId && item.day === chosenDay)));
  }

  prepareSeat = (seatId) => {
    const { chosenSeat, updateSeat } = this.props;
    const { isTaken } = this;

    if(seatId === chosenSeat) return <Button key={seatId} className="seats__seat" color="primary">{seatId}</Button>;
    else if(isTaken(seatId)) return <Button key={seatId} className="seats__seat" disabled color="secondary">{seatId}</Button>;
    else return <Button key={seatId} color="primary" className="seats__seat" outline onClick={(e) => updateSeat(e, seatId)}>{seatId}</Button>;
  }

  render() {

    const { prepareSeat } = this;
    const { requests } = this.props;
    const { seats, chosenDay } = this.props;
    console.log('seats:', seats);
    console.log('chosenDay:', chosenDay);
    console.log('seats on chosenDay:', seats.filter(seat => seat.day == chosenDay).length);

    return (
      <div>
        <h3>Pick a seat</h3>
        <small id="pickHelp" className="form-text text-muted ml-2"><Button color="secondary" /> – seat is already taken</small>
        <small id="pickHelpTwo" className="form-text text-muted ml-2 mb-4"><Button outline color="primary" /> – it's empty</small>
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success) && <div className="seats">{[...Array(50)].map((x, i) => prepareSeat(i+1) )}</div>}
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending) && <Progress animated color="primary" value={50} /> }
        { (requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error) && <Alert color="warning">Couldn't load seats...</Alert> }
        <p>{`Free seats: ${50 - seats.filter(seat => seat.day == chosenDay).length}/50`}</p>
      </div>
    )
  };
}

export default SeatChooser;