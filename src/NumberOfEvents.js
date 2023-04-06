import React, { Component } from "react";
import { ErrorAlert } from "./Alert";



class NumberOfEvents extends Component {
    state = {
    number: 30,
    errorText: ''
    };

    handleInputChange = (event) => {
        let inputValue = event.target.value;

        this.props.updateEvents(null, inputValue);
        this.setState({ 
            number: inputValue
        });

        if (inputValue < 1 || inputValue > 30) {
            this.setState({
              errorText: 'Baa please select number from 1 to 30',
            });
        } else {
            this.setState({
              errorText: '',
            });
        }
    };
    
 
    render() {
        return (
            <div className="NumberOfEvents d-flex flex-column">
                <label for="numberOfEvent_input">Number of Events:</label>
                <input
                    id="numberOfEvents_input"
                    type="number"
                    className="numberOfEvents_input"
                    value={this.state.number}
                    onChange={this.handleInputChange}
                />
                <ErrorAlert text={this.state.errorText} />
            </div> 
        );
    }
}

export default NumberOfEvents;
