Feature: Show/hide an event's details

Scenario: An event element is collapsed by default.
Given the list of events have been loaded
When the user has not clicked on any events
Then all events should be collapsed, only showing generic info

Scenario: User can expand an event to see its details.
Given the list of events have been loaded
When the user clicks on “show details” for an event
Then the event element should expand, showing more specific details about the event

Scenario: User can collapse an event to hide its details.
Given the app has loaded
And the user has already clicked on an event to show its details
When the user clicks “close” on the event to collapse
Then the event should collapse and hide the additional details, showing events with only generic info
