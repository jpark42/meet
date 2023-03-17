import React, { Component } from 'react';



class CitySearch extends Component {
  state = {
      query: '',
      suggestions: [],
      showSuggestions: undefined
  };
  //update the state after the text input changes
  handleInputChanged = (event) => {
    const value = event.target.value;
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) >-1;
    })
    this.setState({ 
      query: value,
      suggestions,
    });
  };
  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false
    });
    
    //handItemClicked now async, being able to be used in testing
    this.props.updateEvents(suggestion);
  }
  render() {
    return (
        <div className="CitySearch">
            <input
                type="text"
                className="city"
                value={this.state.query}
                onChange={this.handleInputChanged }
                //add event listener for "focus" event to the "city" input field
                //callback function will set showSuggestions state to be true
                onFocus={() => { this.setState({ showSuggestions: true }) }}
            />
            <ul className = "suggestions" style={this.state.showSuggestions ? {}: {display: "none"}}>
              {this.state.suggestions.map((suggestion) => (
                <li 
                key={suggestion}
                onClick={() => this.handleItemClicked(suggestion)}
                >{suggestion}</li> //assigning a key to each suggestion
              ))}
              <li onClick={() => this.handleItemClicked("all")}>
                <b>See all cities</b>
              </li>
            </ul>
      </div>
    );
  }
}

export default CitySearch;