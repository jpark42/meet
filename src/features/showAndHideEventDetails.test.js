import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/showAndHideEventDetails.feature');

defineFeature(feature, test => {
    let AppWrapper;
    test('An event element is collapsed by default.', ({ given, when, then }) => {
        given('the list of events have been loaded', () => {
            //can be left empty because the user is already on the main page, where events are collapsed by default
        });

        when('the user has not clicked on any events', () => {
            AppWrapper = mount(<App />)
        });

        then('all events should be collapsed, only showing generic info', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event .event__Details')).toHaveLength(0);
        });
    });

    test('User can expand an event to see its details.', ({ given, when, then }) => {
        given('the list of events have been loaded', () => {
            AppWrapper = mount(<App />);
        });

        when('the user clicks on “show details” for an event', () => {
            AppWrapper.update();
            //simulate user clicking on the "show details" button
            AppWrapper.find('.event .details-button').at(0).simulate('click');
        });

        then('the event element should expand, showing more specific details about the event', () => {
            AppWrapper.update();
            //once the event element has been clicked, it should expand with more details
            expect(AppWrapper.find('.event .event__Details')).toHaveLength(1);
        });
    });

    test('User can collapse an event to hide its details.', ({ given, and, when, then }) => {
        given('the app has loaded', () => {
            AppWrapper = mount(<App />);
        });

        and('the user has already clicked on an event to show its details', () => {
            AppWrapper.update();
            AppWrapper.find('.event .details-button').at(0).simulate('click');
            expect(AppWrapper.find('.event .event__Details')).toHaveLength(1);
        });

        when('the user clicks “close” on the event to collapse', () => {
            AppWrapper.update();
            //simulate user clicking on the "close" button on the event details
            AppWrapper.find('.event .hide-details-button').at(0).simulate('click');
        });

        then('the event should collapse and hide the additional details, showing events with only generic info', () => {
            AppWrapper.update();
            //Event details array now set to 0 as the details should be closed
            expect(AppWrapper.find('.event .event__Details')).toHaveLength(0);
        });
    });
});