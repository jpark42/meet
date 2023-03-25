import React, { Component } from "react";

class NumberOfEvents extends Component {
        state = {
        number: 30
    }

    handleNumberChange = (event) => {
        let inputValue = event.target.value;
        this.props.updateEvents(null, inputValue);
        this.setState({ number: inputValue });
    }
 
    render() {
        return (
            <div className="NumberOfEvents">
                <input
                    id="numberOfEvents_input"
                    type="number"
                    className="numberOfEvents_input"
                    value={this.state.number}
                    onChange={this.handleNumberChange}
                />
            </div>
        );
    }
}

export default NumberOfEvents;