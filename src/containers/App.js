import React, { Component } from 'react';
import './App.css';
import InputBox from '../components/InputBox';
import FlowButton from '../components/FlowButton';
import ResetButton from '../components/ResetButton';
import LoadingBar from '../components/LoadingBar';
import RestartButton from '../components/RestartButton';

class App extends Component {
  constructor() {
    super();
    this.timer = 0;
    this.timeDif = 0;
    this.lastInput = 0;
    this.state = {
      remainingTime: 0,
      millisecond: 0,
      second: 0,
      minute: 0,
      hour: 0,
      goState: 0
    }
  }


  //  Button Settings
  toggleButton = () => {
    this.state.goState ?
      this.stopTimer() : 
      this.startTimer();
  }
  //=====================================================




  //  Reconfigure Timer based on input
  timeReconfig = () => {
    if (this.state.second >= 60 && ( this.state.millisecond || this.state.second > 60 ))
      this.setState({ second: this.state.second % 60, minute: (this.state.minute+1) % 60 });      
    if (this.state.minute >= 60 && ( this.state.second || this.state.minute > 60 ))
      this.setState({ minute: this.state.minute % 60, hour: Math.min(999, this.state.hour+1) });
  }
  //=====================================================




  //  Timer flow
  startTimer = () => {
    if (this.getRemainingTime()){
      this.timeReconfig();
      this.setState({ goState: 1, remainingTime: this.getRemainingTime() });
      this.timeDif = new Date().getTime();
      this.timer = setInterval(this.countDown, 10);
    }
  }
  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ goState: 0 });
  }
  resetTimer = () => {
    clearInterval(this.timer);
    this.setState({
      hour: this.getHour(this.lastInput),
      minute: this.getMinute(this.lastInput),
      second: this.getSecond(this.lastInput),
      millisecond: this.getMillisecond(this.lastInput)
    })
    this.setState({ goState: 0 });
  }
  restartTimer = () => {
    clearInterval(this.timer);
    this.lastInput = 0;
    this.setState({
      remainingTime: 0,
      millisecond: 0,
      second: 0,
      minute: 0,
      hour: 0,
      goState: 0
    });
  }
  //=====================================================



  //  Converts input into milliseconds
  getRemainingTime = () => (this.state.hour*3600 + this.state.minute*60 + this.state.second) * 1000 + this.state.millisecond;
  //=====================================================



  //  to Millisecond
  getHour = (x) => Math.floor(x / 3600000);
  getMinute = (x) => Math.floor((x % 3600000) / 60000);
  getSecond = (x) => Math.floor((x % 60000) / 1000);
  getMillisecond = (x) => x % 1000;
  //=====================================================




  //  Start/Stop Countdown
  countDown = () => {
    this.state.remainingTime <= 0 ? 
      this.restartTimer() :
      this.setState({
        remainingTime: this.state.remainingTime - new Date().getTime() + this.timeDif,
        hour: this.getHour(this.state.remainingTime),
        minute: this.getMinute(this.state.remainingTime),
        second: this.getSecond(this.state.remainingTime),
        millisecond: this.getMillisecond(this.state.remainingTime)
      })
    this.timeDif = new Date().getTime();
  }
  //=====================================================



  //  Input change
  hourInputChange = e => {
    if (isNaN(e.target.valueAsNumber))
      e.target.valueAsNumber = 0;
    this.setState({ hour: e.target.valueAsNumber, remainingTime: this.getRemainingTime() }, () => 
      this.lastInput = this.getRemainingTime()
    ); 
  }

  minuteInputChange = e => {
    console.log(e.target.valueAsNumber);
    if (isNaN(e.target.valueAsNumber))
      e.target.valueAsNumber = 0;
    this.setState({ minute: e.target.valueAsNumber, remainingTime: this.getRemainingTime() }, () => 
      this.lastInput = this.getRemainingTime()
    );
  }

  secondInputChange = e => {
    if (isNaN(e.target.valueAsNumber))
      e.target.valueAsNumber = 0;
    this.setState({ second: e.target.valueAsNumber, remainingTime: this.getRemainingTime() }, () => 
        this.lastInput = this.getRemainingTime()
    );
  }
  millisecondInputChange = e => {
    if (isNaN(e.target.valueAsNumber))
      e.target.valueAsNumber = 0;
    this.setState({ millisecond: e.target.valueAsNumber, remainingTime: this.getRemainingTime() }, () => 
      this.lastInput = this.getRemainingTime()
    );
  }
  //=====================================================




  render() {
    return (
      <div className='tc'>
        <FlowButton timerState={this.toggleButton} goText={this.state.goState} />
        <div id='clock' className="flex flex-wrap justify-center">
          <InputBox searchChange={this.hourInputChange} currentTime={this.state.hour} currentState={this.state.goState} />
          <span>:</span>
          <InputBox searchChange={this.minuteInputChange} currentTime={this.state.minute} currentState={this.state.goState} />
          <span>:</span>
          <InputBox searchChange={this.secondInputChange} currentTime={this.state.second} currentState={this.state.goState} />
          <span>:</span>
          <InputBox searchChange={this.millisecondInputChange} currentTime={this.state.millisecond} currentState={this.state.goState} ms={0}/>
        </div>
        <ResetButton resetTimer={this.resetTimer} />
        <RestartButton restartTimer={this.restartTimer} />
        <LoadingBar targetTime={this.lastInput} remainingTime={this.state.remainingTime} />
      </div>
    );
  }
}

export default App;
