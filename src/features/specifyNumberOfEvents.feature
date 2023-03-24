FEATURE 3: SPECIFY NUMBER OF EVENTS
User story: As a user, I should be able to “specify the number of events shown”, so that I can view the number of events I want to see in the area


Scenario 1: When a user hasn’t specified a number, 32 is the default number.
Given the event details have all been loaded onto the page
When the user hasn’t specified the number of events
Then 32 events should be shown on the page as default

Scenario 2: User can change the number of events they want to see.
Given the event details have all been loaded onto the page
When the user clicks on a button to adjust the number of events they want to see (30, 20, 10)
Then the events page should update showing the number of events the user has chosen (30, 20, 10)
