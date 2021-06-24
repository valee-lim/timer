import React, { Component } from 'react';
import './App.css';
import InputBox from '../components/InputBox';
import FlowButton from '../components/FlowButton';
import ResetButton from '../components/ResetButton';
import LoadingBar from '../components/LoadingBar';
import RestartButton from '../components/RestartButton';
import Alarm from '../alarm.mp3';

class App extends Component {
  constructor() {
    super();
    this.timer = 0;
    this.temp = 0;
    this.timeDif = 0;
    this.lastInput = 0;
    this.audio = new Audio(Alarm);
    this.audio.volume = 0.3;
    this.audio.playbackRate = 0.5;
    this.audio.loop = true;
    this.remainingTime = 0;
    this.state = {
      millisecond: 0,
      second: 0,
      minute: 0,
      hour: 0,
      goState: 0,
    }
  }

  resetAlarm = () => {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  toggleButton = () => {
    this.state.goState ?
      this.stopTimer() : 
      this.startTimer();
  }

  timeReconfig = () => {
    if (this.state.second >= 60 && ( this.state.millisecond || this.state.second > 60 ))
      this.setState({ second: this.state.second % 60, minute: (this.state.minute+1) % 60 });      
    if (this.state.minute >= 60 && ( this.state.second || this.state.minute > 60 ))
      this.setState({ minute: this.state.minute % 60, hour: Math.min(999, this.state.hour+1) });
  }

  startTimer = () => {
    if (this.getRemainingTime()){
      this.timeReconfig();
      this.setState({ goState: 1 });
      this.remainingTime = this.getRemainingTime();
      this.lastInput = this.remainingTime;
      this.timeDif = Date.now();
      this.timer = setInterval(() => this.countDown(), 10);
    }
  }

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ goState: 0 });
    this.resetAlarm();
  }

  resetTimer = () => {
    clearInterval(this.timer);
    this.setState({
      hour: this.getHour(this.lastInput),
      minute: this.getMinute(this.lastInput),
      second: this.getSecond(this.lastInput),
      millisecond: this.getMillisecond(this.lastInput),
      goState: 0
    })
    this.resetAlarm();
  }

  restartTimer = () => {
    clearInterval(this.timer);
    this.lastInput = 0;
    this.remainingTime = 0;
    this.setState({
      millisecond: 0,
      second: 0,
      minute: 0,
      hour: 0,
      goState: 0
    });
    this.resetAlarm();
  }

  timerCompleted = () => {
    clearInterval(this.timer);
    this.setState({
      millisecond: 0
    });
  }

  getRemainingTime = () => (this.state.hour*3600 + this.state.minute*60 + this.state.second) * 1000 + this.state.millisecond;

  getHour = (x) => Math.floor(x / 3600000);
  getMinute = (x) => Math.floor((x % 3600000) / 60000);
  getSecond = (x) => Math.floor((x % 60000) / 1000);
  getMillisecond = (x) => x % 1000;

  countDown = () => {
    this.temp = Date.now();
    this.remainingTime = this.remainingTime - this.temp + this.timeDif;
    this.timeDif = this.temp;
    if (this.remainingTime <= 0) {
      this.timerCompleted();
      this.audio.play();
    }
    else {
      this.setState({
        hour: this.getHour(this.remainingTime),
        minute: this.getMinute(this.remainingTime),
        second: this.getSecond(this.remainingTime),
        millisecond: this.getMillisecond(this.remainingTime)
      })
    }
  }

  hourInputChange = e => {
    if (isNaN(e.target.valueAsNumber))
      e.target.valueAsNumber = 0;
    this.setState({ hour: e.target.valueAsNumber }); 
  }

  minuteInputChange = e => {
    if (isNaN(e.target.valueAsNumber))
      e.target.valueAsNumber = 0;
    this.setState({ minute: e.target.valueAsNumber });
  }

  secondInputChange = e => {
    if (isNaN(e.target.valueAsNumber))
      e.target.valueAsNumber = 0;
    this.setState({ second: e.target.valueAsNumber });
  }
  millisecondInputChange = e => {
    if (isNaN(e.target.valueAsNumber))
      e.target.valueAsNumber = 0;
    this.setState({ millisecond: e.target.valueAsNumber });
  }
  
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
          <InputBox searchChange={this.millisecondInputChange} currentTime={this.state.millisecond} currentState={this.state.goState} milli={0}/>
        </div>
        <ResetButton resetTimer={this.resetTimer} />
        <RestartButton restartTimer={this.restartTimer} />
        <LoadingBar targetTime={this.lastInput} remainingTime={this.remainingTime} />
      </div>
    );
  }
}

export default App;
