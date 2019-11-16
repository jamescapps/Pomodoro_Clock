import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super()
    this.state = {
      break: 5,
      session: 25,
      time: 1500,
      timeLabel: 'Session',
      breakIncDisabled: false,
      breakDecDisabled: false,
      sessionIncDisabled: false,
      sessionDecDisabled: false,
      clicked: false
    }
    this.handleReset = this.handleReset.bind(this)
    this.handleBreakDecrement = this.handleBreakDecrement.bind(this)
    this.handleBreakIncrement = this.handleBreakIncrement.bind(this)
    this.handleSessionDecrement = this.handleSessionDecrement.bind(this)
    this.handleSessionIncrement = this.handleSessionIncrement.bind(this)
    this.handlePlay = this.handlePlay.bind(this)
    this.handlePause = this.handlePause.bind(this)
  }
  
  handleReset() {
    clearInterval(this.finalCD)
    this.setState({
      break: 5,
      session: 25,
      time: 1500,
      timeLabel: 'Session',
      breakIncDisabled: false,
      breakDecDisabled: false,
      sessionIncDisabled: false,
      sessionDecDisabled: false,
      clicked: false
    })
    this.audioBeep.pause()
    this.audioBeep.currentTime = 0
  }
  
  handleBreakDecrement() {
    this.setState({break: this.state.break - 1});
    if (this.state.break <= 2) {
      this.setState({breakDecDisabled: true})
    }
  }
  
  handleBreakIncrement() {
    this.setState({break: this.state.break + 1});
    if (this.state.break > 58) {
      this.setState({breakIncDisabled: true})
    }
  }
  
  handleSessionDecrement() {
    this.setState({time: this.state.session * 60 - 60,
                   session: this.state.session - 1
                  })
    if (this.state.session <= 2) {
      this.setState({sessionDecDisabled: true})
    }
  }
  
  handleSessionIncrement() {
    this.setState({time: this.state.session * 60 + 60,
                   session: this.state.session + 1})
    if (this.state.session > 58) {
      this.setState({sessionIncDisabled: true})
    }
  }
  
  clock() {
    let currentTime = this.state.time
    let minutes = Math.floor(this.state.time / 60);
    let seconds = (this.state.time - minutes * 60);
  
    if (seconds < 10) {
      seconds = '0' + seconds
    } else {
      seconds = seconds
    }
    if (minutes < 10) {
      minutes = '0' + minutes
    } else {
      minutes = minutes
    }
    if (currentTime === 0) {
      this.audioBeep.play()
    }
    if (currentTime < 0  && this.state.timeLabel === 'Session') {
      clearInterval(this.finalCD)
      this.breakCountDown()
    }
    if (currentTime < 0 && this.state.timeLabel === 'Break') {
      clearInterval(this.finalCD)
      this.sessionCountDown()
    }
    
    return minutes + ':' + seconds
  }

  breakCountDown() {
    this.setState({  
                      timeLabel: 'Break',
                      time: (this.state.break * 60),
                    })
      this.finalCD = setInterval(function() {
              this.countDown();
              }.bind(this), 1000);
  }
  
  sessionCountDown() {
    this.setState({   
                      timeLabel: 'Session',
                      time: (this.state.session * 60)
                    })
      this.finalCD = setInterval(function() {
              this.countDown();
              }.bind(this), 1000);
  }
  
  countDown() {
    this.setState({time: (this.state.time - 1)});
  }

   handlePlay() {
     if(this.state.clicked) {
       clearInterval(this.finalCD)
    this.setState({
                    time: this.state.time + 1,
                    clicked: false,
                  })
     this.finalCD = setInterval(function() {
     this.countDown();
     }.bind(this), 1000);
     } else {
       clearInterval(this.finalCD)
    this.setState({
                    time: this.state.time,
                    clicked: true,
                  })
     this.finalCD = setInterval(function() {
     this.countDown();
     }.bind(this), 1000);
     }
    
   }
  
  handlePause() {
    this.setState({clicked: false,
                   isRunning: false})
    clearInterval(this.finalCD)
  }

  render() {
    //let className = this.state.clicked ? "fa fa-pause fa-lg fa-3x" : "fa fa-play fa-lg fa-3x";
    return (
      <div className = "project">
        <div className = "title">
        Pomodoro Clock
        </div>
        <div className = "controls">
          <div className = "break">
            <button  id="break-increment" 
                     onClick = {this.handleBreakIncrement}
                     disabled = {this.state.breakIncDisabled}
                     ><i className="fa fa-plus fa-2x"></i></button>
            <h1 id = "break-label" >Break Length</h1>
            <h2 id = "break-length">{this.state.break}</h2>
            <button  id="break-decrement" 
                     onClick = {this.handleBreakDecrement}
                     disabled = {this.state.breakDecDisabled}>
                      <i className="fas fa-minus fa-2x"></i></button>
          </div>
          <div className = "session">
            <button  id="session-increment" 
                     onClick = {this.handleSessionIncrement} 
                     disabled = {this.state.sessionIncDisabled}>
                     <i className="fa fa-plus fa-2x"></i></button>
            <h1 id = "session-label">Session Length</h1>
            <h2 id = "session-length">{this.state.session}</h2>
            <button  id="session-decrement" 
                     onClick = {this.handleSessionDecrement} 
                     disabled = {this.state.sessionDecDisabled}>
                     <i className="fas fa-minus fa-2x"></i></button>
          </div>
          <div className = "timer">
            <h1 id = "timer-label">{this.state.timeLabel}</h1>
            <h2 id = "time-left">{this.clock()}</h2>
            <button id = "start_stop" className = "play" onClick = {this.handlePlay}><i className = "fa fa-play fa-lg fa-3x"  > </i></button>
            <button id = "start_stop" className = "pause" onClick = {this.handlePause}><i className = "fa fa-pause fa-lg fa-3x"></i></button>
            <button id = "reset" onClick = {this.handleReset}><i className="fas fa-undo fa-2x"></i></button>
          </div>
        </div>
        <audio id="beep" preload="auto" 
          src="https://goo.gl/65cBl1"
          ref={(audio) => { this.audioBeep = audio; }} />
      </div>  
    )
  }
}

export default App;
