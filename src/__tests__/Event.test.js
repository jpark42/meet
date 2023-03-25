import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> componenent', () => {
    let EventWrapper;
    const event = mockData[0];
    beforeAll(() => {
        EventWrapper = shallow(<Event event={event} />);
    })

    // renders the event component
    test('renders the component', () => {
        expect(EventWrapper).toBeDefined();
    });

    // renders the h2 summary correctly
    test('summary is rendered correctly in a h2 tag', () => {
        const summary = EventWrapper.find('h2.summary');
        expect(summary).toHaveLength(1);
        expect(summary.text()).toBe(event.summary);
    });

    // checks the start time of location is rendered
    test('event start time is rendered correctly', () => {
        const eventStart = EventWrapper.find('p.event-start');
        expect(eventStart).toHaveLength(1);
        expect(eventStart.text()).toBe(new Date(event.start.dateTime).toString());
      });

    // checks if the location is rendered
    test('event location is rendered correctly', () => {
        const eventLocation = EventWrapper.find('p.event-location');
        expect(eventLocation).toHaveLength(1);
        expect(eventLocation.text()).toBe(`@${event.summary} | ${event.location}`);
       
      });


    // checks if the button is collapsed by default
    test('renders collapsed by default', () => {
        expect(EventWrapper.state('collapsed')).toBe(true);
    });

    // renders collapsed view
    test('the collapsed view is rendered correctly', () => {
        expect(EventWrapper.find('h3.about')).toHaveLength(0);
        expect(EventWrapper.find('a.link')).toHaveLength(0);
        expect(EventWrapper.find('p.description')).toHaveLength(0);
    });

    // user can view event details when clicking button
    test('user can expand an event when clicking show details button', () => {
        const detailsButton = EventWrapper.find('button.details-button');
        expect(detailsButton.text()).toBe('Details');
        detailsButton.simulate('click');
        expect(EventWrapper.state('collapsed')).toBe(false);
    })

    // // renders expanded view
    // test('event details is expanded and rendered correctly', () => {
    //     expect(EventWrapper.find('h3.about')).toHaveLength(1);
    //     expect(EventWrapper.find('a.link')).toHaveLength(1);
    //     expect(EventWrapper.find('p.description')).toHaveLength(1);
    
    // });

    test('clicking Details button changes the state', () => {
        EventWrapper.setState({ collapsed: true });
        EventWrapper.find('.details-button').simulate('click');
        expect(EventWrapper.state('collapsed')).toBe(false);
    });

    test('event__Details rendered when !collapsed', () => {
        EventWrapper.setState({ collapsed: false });
        expect(EventWrapper.find('.event__Details')).toHaveLength(1);
        expect(EventWrapper.find('.event').children()).toHaveLength(5);
    });

    test('clicking Hide details button changes the state', () => {
        EventWrapper.setState({ collapsed: false });
        EventWrapper.find('.hide-details-button').simulate('click');
        expect(EventWrapper.state('collapsed')).toBe(true);
    });


    
    // // user can not view event details when clicking button
    // test('user can collapse an event when clicking hide details button', () => {
    //     const detailsButton = EventWrapper.find('button.details-btn');
    //     expect(detailsButton.text()).toBe('Hide Details');
    //     detailsButton.simulate('click');
    //     expect(EventWrapper.state('collapsed')).toBe(true);
    // })

});