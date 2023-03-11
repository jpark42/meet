import React from 'react';

//importing shallow rendering API from Enzyme, a light rendering of your React components, suitable for testing
import { shallow } from 'enzyme';
//importing App as you cannot test a component without importing it 
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';

/* Unit Testing Syntax
test('test description', () => {
    expect(someFunction()).toBe(somevalue);
  });
*/

describe('<App /> component', () => {
    let AppWrapper;
    beforeAll(()=> {
        AppWrapper = shallow(<App />); //beforeAll() executes code before each one of your tests, so you odn't have to write it repeatedly
    });

    test('render list of events', () => {
        expect(AppWrapper.find(EventList)).toHaveLength(1); // running a search find(), for EventsList components within AppWrapper and comparing the result with the expected result. Which should be only 1 EventList
      });

    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });
});
