import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../CitySearch';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';

describe('<CitySearch /> component', () => {
let locations, CitySearchWrapper;
beforeAll(()=> {
  locations = extractLocations(mockData);//passing superset of locations as a prop to the CitySearch component
  CitySearchWrapper = shallow(<CitySearch locations={locations} updateEvents={() => {}} />);
});


    //Testing whether an element with a class name "city" exists within the CitySearchWrapper component
  test('render text input', () => {
    expect(CitySearchWrapper.find('.city')).toHaveLength(1);
  });


  test('renders a list of suggestions', () => {
    expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
  });


  test('renders text input correctly', () => {
    const query = CitySearchWrapper.state('query');// query is equal to query element of CitySearch state, which is the query that the user types into the textbox
    expect(CitySearchWrapper.find('.city').prop('value')).toBe(query); //compare each value prop of each element that has the class "city" found in CitySearch component and checks if its value is equal to the CitySearch query state
  });


  test('change state when text input changes', () => {
    //setting query state equal to Munich
    CitySearchWrapper.setState({
      query: 'Munich'
    });
    const eventObject = { target: { value: 'Berlin' }}; //Change value to Berlin once its change event is called
    CitySearchWrapper.find('.city').simulate('change', eventObject); //simulate() takes 2 paramaters. It is simulating the change of city to the target value of Berlin
    expect(CitySearchWrapper.state('query')).toBe('Berlin');
  });


  test('render list of suggestions correctly', () => {
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations }); //setting suggestions state to the full list of mock locations
    const suggestions = CitySearchWrapper.state('suggestions');
    //Comparing the number of rendered suggestions to the number of suggestions in the state of CitySearch and the rendered text is checked to see it's also from the state.
    //The forLoop loops through all the suggestions and compares the items in suggestions one by one
    expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length + 1);
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i]);
    }
  });


  test('suggestion list match the query when changed', () => {
    CitySearchWrapper.setState({ query: '', suggestions: [] });
    CitySearchWrapper.find(".city").simulate("change", {
      target: { value: "Berlin" },
    });
    const query = CitySearchWrapper.state("query");
    const filteredLocations = locations.filter((location) => {
      return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
    });
    expect(CitySearchWrapper.state("suggestions")).toEqual(filteredLocations);
  });


  test("selecting a suggestion should change query state", () => {
    CitySearchWrapper.setState({
      query: 'Berlin'  });
    const suggestions = CitySearchWrapper.state('suggestions');
    CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
    expect(CitySearchWrapper.state("query")).toBe(suggestions[0]);
  });


  test("selecting CitySearch input reveals the suggestions list", () => {
    CitySearchWrapper.find('.city').simulate('focus');
    //expecting value of showSuggestions to be true (new local state will have to be added to citySearch component)
    //this new showSuggestions state will be used as a boolean flag to determine whether to show the suggestions list or not
    expect(CitySearchWrapper.state('showSuggestions')).toBe(true);
    expect(CitySearchWrapper.find('.suggestions').prop('style')).not.toEqual({ display: 'none' });
  });


  test("selecting a suggestion should hide the suggestions list", () => {
    CitySearchWrapper.setState({
      query: 'Berlin',
      showSuggestions: undefined
    });
    CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
    //check if new state of showSuggestions is false
    expect(CitySearchWrapper.state('showSuggestions')).toBe(false);
    //check is .suggestions class is hidden using display: "none" in CSS.
    //need to manually change showSuggestions back to undefined, otherwise it will still hold true from the previous test
      //this is because citySearchWrapper isn't global relative to the rest of your tests due to refactoring 
    expect(CitySearchWrapper.find('.suggestions').prop('style')).toEqual({ display: 'none' });
  });
});

