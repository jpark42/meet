import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
    let AppWrapper, NumberOfEventsWrapper;
    test('When a user hasn’t specified a number, 30 is the default number.', ({ given, when, then }) => {
        given('the event details have all been loaded onto the page', () => {
            AppWrapper = mount(<App />);
        });

        when('the user hasn’t specified the number of events', () => { });

        then('30 events should be shown on the page as default', () => {
            AppWrapper.update();
            NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
            expect(NumberOfEventsWrapper.state('number')).toEqual(30);
            expect(AppWrapper.find('.event').length).toBeLessThanOrEqual(30);
        });
    });

    test('User can change the number of events they want to see.', ({ given, when, then }) => {
        given('the event details have all been loaded onto the page', () => {
            AppWrapper = mount(<App />);
        });

        when('the user clicks on a button to adjust the number of events they want to see', () => {
            let numberInput = AppWrapper.find('.numberOfEvents_input');
            const newNumberOfEvents = { target: { value: 3 } };
            numberInput.simulate('change', newNumberOfEvents);
        });

        then('the events page should update showing the number of events the user has chosen', () => {
            AppWrapper.update();
            NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
            expect(NumberOfEventsWrapper.state('number')).toEqual(3);
            expect(AppWrapper.find('.event').length).toBeLessThanOrEqual(3);
        });
    });
});