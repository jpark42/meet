Feature: Specify number of events

Scenario: When a user hasn’t specified a number, 30 is the default number.
Given the event details have all been loaded onto the page
When the user hasn’t specified the number of events
Then 30 events should be shown on the page as default

Scenario: User can change the number of events they want to see.
Given the event details have all been loaded onto the page
When the user clicks on a button to adjust the number of events they want to see
Then the events page should update showing the number of events the user has chosen
