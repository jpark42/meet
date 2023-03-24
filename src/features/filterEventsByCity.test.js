import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';
import { loadFeature, defineFeature } from 'jest-cucumber';
import CitySearch from '../CitySearch';
import { extractLocations } from '../api';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, test => {
    test('When user hasn’t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
      given('user hasn’t searched for any city', () => {
        //can be left empty because the user hasn't searched for anything
      });
  
      
      let AppWrapper;
      when('the user opens the app', () => {
        //rendering App component is the same thing as "opening the app" as it's the same code that would be executed
        AppWrapper = mount(<App />);
      });

  
      then('the user should see the list of upcoming events.', () => {
        //Need to update the component because getting list of events is an async function. None of the changes will be displayed on the app component without this
        AppWrapper.update();
        expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
      });
    });
  
    test('User should see a list of suggestions when they search for a city', ({ given, when, then }) => {
      let CitySearchWrapper;
      let locations = extractLocations(mockData);
      given('the main page is open', () => {
        //Simultate app being opened. Can use shallow() because you don't need to render any of CitySearch's children
        CitySearchWrapper = shallow(<CitySearch updateEvents={() => {}} locations={locations} />);
      });
  
      when('the user starts typing in the city textbox', () => {
        //Simulate the 'change' event on a city element, giving it a value of Berlin 
        CitySearchWrapper.find('.city').simulate('change', {target: { value: 'Berlin' } });
      });
  
      then('the user should receive a list of cities (suggestions) that match what they’ve typed', () => {
        //There should be 2 suggestions, 'Berlin' and 'See all cities'
        expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2);
      });
    });
  
  
    test('User can select a city from the suggested list', ({ given, and, when, then }) => {
      let AppWrapper;
      given('user was typing “Berlin” in the city textbox', async () => {
        //Given async function to allow App component to load events and locations and rendered using mount()
        //Rendering fully because we need to interact with it's child component CitySearch
        AppWrapper = await mount(<App />);
        //simulating a 'change' event on the city element, changing it's value to Berlin
        AppWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } });
      });
      
      //'and' and 'then' being used as a concatenator, requiring 2 different preconditions for the test to be executed
      and('the list of suggested cities is showing', () => {
        //update() called on AppWrapper to make sure the App component is updated after it receives its list of suggestions
        AppWrapper.update();
        //Check whether two suggestions are being displayed in the App's list of suggestions
        expect(AppWrapper.find('.suggestions li')).toHaveLength(2);
      });
  
      when('the user selects a city (e.g., “Berlin, Germany”) from the list', () => {
        //simulating a 'click' event on the first suggestion (ex: Germany)
        AppWrapper.find('.suggestions li').at(0).simulate('click');
      });
  
      then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {
        //can access CitySearch because App was fully rendered via mount() previously
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        //checking if state of the query is equal to 'Berlin, Germany'
        expect(CitySearchWrapper.state('query')).toBe('Berlin, Germany');
      });
  
      and('the user should receive a list of upcoming events in that city', () => {
        //check whether the number of events rendered in the App component are the same as those included in the mock-data.js file
        expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
      });
    });
  });