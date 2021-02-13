import React, { Component } from "react";

export class Calender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date : this.props.defaultDate
        };
        this.props.onChange(this.state.date);
    }

    render() {
        return (
            <input type="datetime-local" ref={(date) => {this.dateRef = date;}} value={this.state.date} onChange={this._onDateChange.bind(this)} required/>
        );
    }

    _onDateChange(e) {
        let state = this.state;
        state['date'] = e.target.value;
        // Or (you can use below method to access component in another method)
        state['date'] = this.dateRef.value;
        this.setState(state);
        this.props.onChange(state.date);
    }

}
