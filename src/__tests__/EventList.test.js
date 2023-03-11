import React from 'react';
import { shallow } from 'enzyme';
import EventList from '../EventList';
import Event from '../Event';
import { mockData } from '../mock-data';

/* Unit Testing Syntax
test('test description', () => {
    expect(someFunction()).toBe(somevalue);
  });
*/

//This test will only pass if EventList renders exactly four events from its prop events. The prop is set manually using mock data, which, in this case, is a list of events that contains four empty objects
describe('<EventList /> component', () => {
  test('render correct number of events', () => {
    const EventListWrapper = shallow(<EventList events={mockData} />);
    expect(EventListWrapper.find(Event)).toHaveLength(mockData.length);
  });
});