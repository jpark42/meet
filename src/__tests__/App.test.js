import React from 'react';

//importing shallow rendering API from Enzyme, a light rendering of your React components, suitable for testing. 
//importing mount rendering API from Enzyme, a full rendering of your React components and its children, used for integration testing with multiple components
import { shallow, mount } from 'enzyme';
//importing App as you cannot test a component without importing it 
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';
import NumberOfEvents from '../NumberOfEvents';

/* Unit Testing Syntax
test('test description', () => {
    expect(someFunction()).toBe(somevalue);
  });
*/

//Unit tests
describe('<App /> component', () => {
    let AppWrapper;
    beforeAll(()=> {
        AppWrapper = shallow(<App />);
    });

    test('render list of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1); // running a search find(), for EventsList components within AppWrapper and comparing the result with the expected result. Which should be only 1 EventList
      });

    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });

    test('render NumberOfEvents', () => {
      expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
    });
});


//Integration testing of multiple components at once
describe('<App /> integration', () => {
  test('App passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined); //need to make sure state is not undefined bc the test could still pass if both the state of events and props of events dont exist
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined); //need to make sure state is not undefined bc the test could still pass if both the state of events and props of events dont exist
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });

  test('get list of events matching the city selected by the user', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations }); //CitySearch's suggestions state has been set to have all available cities
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * (suggestions.length)); //will evaluate to an integer value ranging from 0 to suggestion.length - 1
    const selectedCity = suggestions[selectedIndex]; //once the index is selected, it's used to return the actual suggestion, suugestion[slectedIndex], which is stored in the selectedCity variable
    await CitySearchWrapper.instance().handleItemClicked(selectedCity); //click is mimicked by calling handleItemClicked() method from CitySearc. Possible by calling instance() of CitySearchWrapper
    //Await is added when handleItemClicked() is called bc it is expected that it will have async code that involves fetching the full list of events before filtering them down to the list of events that match the selected city
    const allEvents = await getEvents(); //getEvents is mainly expected to get all the events from the API asynchronously (and from the mock data when it’s used in tests)
    const eventsToShow = allEvents.filter(event => event.location === selectedCity); //list of all events is filtered against the selected location/city in order to find the events that have the same location. This is then stored in eventsToShow
    expect(AppWrapper.state('events')).toEqual(eventsToShow); //compares whether the state of events actually takes the same array as eventsToShow
    AppWrapper.unmount();
  });

  //Simulates a click on the last list item (which will always be “See all cities”), then checks if the events state of the App component equals the list of all events.
  test('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    await suggestionItems.at(suggestionItems.length - 1).simulate('click');
    const allEvents = await getEvents();
    expect(AppWrapper.state('events')).toEqual(allEvents);
    AppWrapper.unmount();
  });

  //Integration testing for NumberOfEvents

  test('App passes "numberOfEvents" state as a prop to NumberOfEvents', () => {
    const AppWrapper = mount(<App />);
    const AppEventCountState = AppWrapper.state('numberOfEvents');
    expect(AppEventCountState).not.toEqual(undefined);
    AppWrapper.setState({ numberOfEvents: 10 });
    expect(AppWrapper.find(NumberOfEvents).props().numberOfEvents).toBe(AppWrapper.state('numberOfEvents'));
    AppWrapper.unmount();
  });

  test('Filtered list of events matches mock data', async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    NumberOfEventsWrapper.find('input.numberOfEvents_input').simulate('change', {target: { value: 10 },});
    await getEvents();
    expect(AppWrapper.state('events')).toEqual(mockData.slice(0, 10));
    AppWrapper.unmount();
  });

});
