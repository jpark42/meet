import React, { Component } from "react";
import { ErrorAlert } from "./Alert";



class NumberOfEvents extends Component {
    state = {
    number: 30,
    infoText: ''
    };

    handleInputChange = (event) => {
        let inputValue = event.target.value;

        this.props.updateEvents(null, inputValue);
        this.setState({ 
            number: inputValue
        });

        if (inputValue < 1 || inputValue > 30) {
            this.setState({
              infoText: 'Select number from 1 to 30',
            });
        } else {
            this.setState({
              infoText: '',
            });
        }
    };
    
 
    render() {
        return (
            <div className="NumberOfEvents">
                <input
                    id="numberOfEvents_input"
                    type="number"
                    className="numberOfEvents_input"
                    value={this.state.number}
                    onChange={this.handleInputChange}
                />
                <ErrorAlert text={this.state.infoText} />
            </div> 
        );
    }
}

export default NumberOfEvents;
