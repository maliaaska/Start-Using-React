import React, { Component } from 'react';

import './App.css';

class Clock extends Component {
    constructor(props){
        super(props);
        this.state ={
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        }
        console.log('this.props', this.props)
    }
    render (){
        return(<div>
            <div className="Clock-days">{this.state.days} Days</div>
            <div className="Clock-hours">{this.state.hours} hours</div>
            <div className="Clock-minuts">{this.state.minutes} minuts</div>
            <div className="Clock-seconds">{this.state.seconds} seconds</div>
        </div>)
        
    }
}
export default Clock;