import React, { Component } from 'react';
import './App.css';
import InputBox from '../components/InputBox'

class App extends Component {
  constructor() {
    super();
    this.timer = 0;
    this.timeDif = 0;
    this.state = {
      remainingTime: 0,
      millisecond: 0,
      second: 0,
      minute: 0,
      hour: 0,
      goState: 'Start'
    }
  }


  //  Button Settings
  toggleButton = () => {
    this.state.goState === "Start" ?
      this.startTimer() : 
      this.stopTimer();
  }
  //=====================================================




  //  Reconfigure Timer based on input
  timeReconfig = () => {
    if (this.state.second >= 60 && ( this.state.millisecond || this.state.second > 60 ))
      this.setState({ second: this.state.second % 60, minute: (this.state.minute+1) % 60 });      
    if (this.state.minute >= 60 && ( this.state.second || this.state.minute > 60 ))
      this.setState({ minute: this.state.minute%60, hour: Math.min(999, this.state.hour+1) });
  }
  //=====================================================




  //  Start/Stop/Reset Timer
  startTimer = () => {
    this.timeReconfig();
    this.setState({ goState: 'Stop', remainingTime: this.getRemainingTime() });
    this.timeDif = new Date().getTime();
    this.timer = setInterval(this.countDown, 10);
  }
  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ goState: 'Start'});
  }
  resetTimer = () => {
    clearInterval(this.timer);
    this.setState({
      remainingTime: 0,
      millisecond: 0,
      second: 0,
      minute: 0,
      hour: 0,
      goState: 'Start'
    });
  }
  //=====================================================



  //Converts input into milliseconds
  getRemainingTime = () => (this.state.hour*3600 + this.state.minute*60 + this.state.second) * 1000 + this.state.millisecond;



  //  Start Countdown
  countDown = () => {
    //stop timer conditions
    this.state.remainingTime <= 0 ? 
      this.resetTimer() :
      this.setState({
        remainingTime: this.state.remainingTime - new Date().getTime() + this.timeDif,
        hour: Math.floor(this.state.remainingTime / 3600000),
        minute: Math.floor((this.state.remainingTime % 3600000) / 60000),
        second: Math.floor((this.state.remainingTime % 60000) / 1000),
        millisecond: this.state.remainingTime % 1000
      })
    this.timeDif = new Date().getTime();
  }
  //=====================================================



  //  Input change
  hourInputChange = e => {
    this.setState({ hour: e.target.valueAsNumber }); 
  }

  minuteInputChange = e => {
    this.setState({ minute: e.target.valueAsNumber });
  }

  secondInputChange = e => {
    this.setState({ second: e.target.valueAsNumber });
  }
  millisecondInputChange = e => {
    this.setState({ millisecond: e.target.valueAsNumber });
  }
  //=====================================================




  render() {
    return (
      <div className='tc'>
        <button id='startButton' onClick={this.toggleButton}>{this.state.goState}</button>
        <div id='clock' className="flex flex-wrap justify-center">
          <InputBox searchChange={this.hourInputChange} currentTime={this.state.hour} digitHandle={1} currentState={this.state.goState} />
          <span>:</span>
          <InputBox searchChange={this.minuteInputChange} currentTime={this.state.minute} digitHandle={0} currentState={this.state.goState} />
          <span>:</span>
          <InputBox searchChange={this.secondInputChange} currentTime={this.state.second} digitHandle={0} currentState={this.state.goState} />
          <span>:</span>
          <InputBox searchChange={this.millisecondInputChange} currentTime={this.state.millisecond} digitHandle={1} currentState={this.state.goState} />
        </div>
      </div>
    );
  }
}

export default App;
