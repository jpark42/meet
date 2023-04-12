import React, { Component, createRef } from "react";
import ClickAwayListener from "react-click-away-listener";
import { InfoAlert } from "./Alert";

class CitySearch extends Component {
  //set up inital state of CitySearch component
  constructor(props) {
    super(props);

    //Creating a 'ref' to the 'ul' element where the list of suggesitons will be displayed
    this.suggestionsUL = createRef();
    this.state = {
      locations: this.props.locations,
      query: "",
      suggestions: [],
      showSuggestions: undefined,
      infoText: "",
    };
    this.handleClickAway = this.handleClickAway.bind(this);
  }

  //update the state after the text input changes
  handleInputChange = (event) => {
    const query = event.target.value;

    //Checks whether the 'query' input has a value greater than 0
    //If great than 0, sets the 'display' style of the 'suggestionsUL' ref to 'block' so that the list of suggestions becomes visible
    //Also sets the state of 'suggestions' to 'true' so that the list can be displayed
    //Also filters the 'this.props.locations' array to get a list of suggestions that can match the query entered by the user
    //Suggestions are then filtered using 'indexOf' method of 'location' array, which returns the index of the first occurrence of a specified value in a string
    //toUpperCase() coverts both query and location strings to uppercase to ensure the comparison is case insensitive
    if (query.length > 0) {
      this.suggestionsUL.current.style.display = "block";
      this.setState({ showSuggestions: true });
      const suggestions = this.props.locations.filter((location) => {
        return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
      });

      //Code is executed when the search query doesn't match any of available locations in the 'locations' array
      //sets 'query' state to value of search query
      //sets state of 'infoText' to the customized error message that informs the user that the city they are looking for cannot be found
      //Error message is then displayed in the InfoText component below in the search bar
      if (suggestions.length === 0) {
        console.log(query);
        this.setState({
          query,
          infoText:
            "Baa we cannot find the city you are looking for. Please try another city or check your spelling.",
        });

        //This code is executed if THERE ARE suggestions available for the user's input query
        //sets state of 'query' to the current query
        //sets state of 'suggestions' to the filtered list of locations matching the query
        //sets state of 'infoText' to an empty string, clearing any previous error messages
      } else {
        this.setState({
          query,
          suggestions,
          infoText: "",
        });
      }

      //This is what happens when the user clears the search input
      //When length of query is 0, indicating that the input field is empty, the 'query' state is set to an empty string
      //'infoText' state is set to be an empty string
      //and 'suggestions' state is set to an empty array, effectively clearing any existing suggestions
    } else {
      this.setState({
        query: "",
        infoText: "",
        suggestions: [],
      });
    }
  };

  //Function is triggered when user clicks on a city suggestion or "see all cities"
  //When called, takes the suggestion that was clicked as a parameter and updates the state of CitySearch
  //More specifically, it sets the 'query' state to the value of suggestion, clears the suggestion array
  //Clears the suggestions array and hides the suggestions drop downlist by setting ShowSuggestions to 'false'
  //Lastly, it sets infoText state to an empty string, so there is no error message
  handleItemClick = (suggestion) => {
    this.setState({
      query: suggestion,
      suggestions: [],
      showSuggestions: false,
      infoText: "",
    });

    this.handleClickAway();

    //calling updateEvents function passed as a prop from App.js
    //updates the events displayed in the app based on the selected city
    //by passing the selected 'suggestion' as an argument to updateEvents(), App.js can use this city name to fetch relevant events and update its state accordingly
    this.props.updateEvents(suggestion);
  };

  //onClick event listener for the CitySearch bar
  //When clicking outside of the searchbar, suggestions will be hidden
  handleClickAway = () => {
    console.log("click away from search bar to stop showing suggestions");
    this.suggestionsUL.current.style.display = "none";
  };

  render() {
    return (
      <ClickAwayListener onClickAway={this.handleClickAway}>
        <div className="CitySearch">
          <input
            type="text"
            className="city"
            id="city"
            value={this.state.query}
            onChange={this.handleInputChange}
            placeholder="Search by city"
          />
          <ul
            ref={this.suggestionsUL}
            className={
              this.state.showSuggestions
                ? "suggestions showSuggestions"
                : "display-none"
            }
          >
            <li className={this.state.infoText === "" ? "display-none" : ""}>
              <InfoAlert text={this.state.infoText} />
            </li>
            {this.state.suggestions.map((suggestion) => (
              <li
                key={suggestion}
                onClick={() => this.handleItemClick(suggestion)}
              >
                {suggestion}
              </li> //assigning a key to each suggestion
            ))}
            <li key="all" onClick={() => this.handleItemClick("all")}>
              <b>See all cities</b>
            </li>
          </ul>
        </div>
      </ClickAwayListener>
    );
  }
}

export default CitySearch;
