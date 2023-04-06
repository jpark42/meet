import React, { Component } from 'react';
import { InfoAlert } from './Alert';


class CitySearch extends Component {
  state = {
      locations: this.props.locations,
      query: '',
      suggestions: [],
      showSuggestions: undefined,
      infoText: ''
  };
  //update the state after the text input changes
  handleInputChanged = (event) => {
    const value = event.target.value;

    if (value.length > 0 ) {
      this.setState({showSuggestions:true});
      const suggestions = this.props.locations.filter((location) => {
        return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
      ;})
      //if the list of suggestions returns 0 events, then have infoText state show message that the app cant find a city and to try again
      if (suggestions.length === 0) {
        this.setState({ 
          query: value,
          infoText: 'Baa we cannot find the city you are looking for. Please try another city or check your spelling.'
        });
      //if the list does return suggestions, then the infoText state is set to be empty, thus the alert staying hidden
      } else {
        return this.setState({
          query: value,
          suggestions,
          infoText: ''
        });
      }
    }
  };
  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      suggestions: [],
      showSuggestions: false,
      infoText: ''
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
                id="city"
                value={this.state.query}
                onChange={this.handleInputChanged}
                placeholder="Search by city"
            />
            <ul 
              className = {
                this.state.showSuggestions
                ? 'suggestions showSuggestions'
                : 'display-none'
              }
            >
              <li className={this.state.infoText === '' && 'display-none'}>
                <InfoAlert text={this.state.infoText} />
              </li>
              {this.state.suggestions.map((suggestion) => (
                <li 
                key={suggestion}
                onClick={() => this.handleItemClicked(suggestion)}
                >
                  {suggestion}
                </li> //assigning a key to each suggestion
              ))}
              <li key="all" onClick={() => this.handleItemClicked("all")}>
                <b>See all cities</b>
              </li>
            </ul>
      </div>
    );
  }
}

export default CitySearch;