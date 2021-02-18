import React, { Component } from 'react';
import './App.css';
import InputBox from '../components/InputBox'

class App extends Component {
  constructor() {
    super();
    this.tabIsActive = true;
    this.timer = 0;
    this.state = {
      milisecond: parseInt(0),
      second: parseInt(0),
      minute: parseInt(0),
      hour: parseInt(0),
      goState: 'Start'
    }
  }

  componentDidMount() {
      window.addEventListener("focus", this.onFocus);
      window.addEventListener("blur", this.onBlur);
  }

  componentWillUnmount() {
      window.removeEventListener("focus", this.onFocus);
      window.removeEventListener("blur", this.onBlur);
  }

  onFocus = () => {
    this.tabIsActive = true;
  }

  onBlur = () => {
    this.tabIsActive = false;
  }

  toggleButton = () => {
    if (this.state.goState === "Start"){
      this.startTimer();
    }
    else{
      this.stopTimer();
    }
  }

  timeReconfig = () => {
    if (this.state.second >= 60){
      if (this.state.milisecond || this.state.second > 60){
        this.setState({ second: this.state.second%60 });
        this.setState({ minute: (this.state.minute+1)%60 });   
      }
    }
    if (this.state.minute >= 60){
      if (this.state.second || this.state.minute > 60){
        this.setState({ minute: this.state.minute%60 })
        this.setState({ hour: Math.min(999, this.state.hour+1) });    
      }
    }
  }

  startTimer = () => {
    this.timeReconfig();
    this.timer = setInterval(this.countDown, this.tabIsActive ? 10 : 1000);
    this.setState({ goState: 'Stop' })
  }

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ goState: 'Start'})
  }

  updateHour = () => {
    if (this.state.hour === 0){
      return;
    }
    this.setState({ hour: this.state.hour-1 });
  }

  updateMinute = () => {
    if (this.state.minute === 0){
      this.updateHour();
    }
    this.setState({ minute: (60+this.state.minute-1)%60 });
  }

  updateSecond = () => {
    if (this.state.second === 0) {
      this.updateMinute();
    }
    this.setState({ second: (60+this.state.second-1)%60 });
  }

  updateMilisecond = () => {
    if (this.state.milisecond === 0) {
      this.updateSecond();
    }
    this.setState({ milisecond: (99+this.state.milisecond-1)%99} )
  }

  countDown = () => {
    //stop timer conditions
    if (!(this.state.milisecond || this.state.second || this.state.minute || this.state.hour)){
      this.stopTimer();
      return;
    }
    this.tabIsActive ? this.updateMilisecond() : this.updateSecond();
  }

  hourInputChange = (e) => {
    this.setState({ hour: e.target.valueAsNumber }); 
  }

  minuteInputChange = (e) => {
    this.setState({ minute: e.target.valueAsNumber });
  }

  secondInputChange = (e) => {
    this.setState({ second: e.target.valueAsNumber });
  }

  render() {
    return (
      <div className='tc'>
        <button id='startButton' onClick={this.toggleButton}>{this.state.goState}</button>
        <div id='clock' className="flex flex-wrap justify-center">
          <InputBox searchChange={this.hourInputChange} currentTime={this.state.hour} hourHandle={1} currentState={this.state.goState} />
          <span>:</span>
          <InputBox searchChange={this.minuteInputChange} currentTime={this.state.minute} hourHandle={0} currentState={this.state.goState} />
          <span>:</span>
          <InputBox searchChange={this.secondInputChange} currentTime={this.state.second} hourHandle={0} currentState={this.state.goState} />
          <span>:</span>
          <span id='milisecond'>{this.state.milisecond}</span> 
        </div>
      </div>
    );
  }
}

export default App;
