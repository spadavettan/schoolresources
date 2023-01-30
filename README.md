# schoolresources (need a more creative name - maybe haven?)

## React, Nodejs, Postgres, Express SPA that allows users to upload resources (textbooks, youtube videos, images, documents, etc.) for a specific class at a specific university. (In Progress)

###### The goal of this application is to reduce the amount of random googling people have to do when searching for help on a certain project/assignment.
###### Searching normally can be vague and ambiguous, but using a centralized list curated by students who have taken the exact same class from the
###### same professor could be very useful in reducing friction when learning a new concept or studying for an exam.

## What's working
- Server backend calls are working and tested by Postman TODO: find automated testing solution
- Rendering of table data
- Delete functionality for all elements
- Addition of elements except for resources
- Clicking an element will take you to that elements subcategory (clicking classes takes you to professors page for that class)

## TODO:
- Fix tabs for classes and professors not re-rendering page (potentially solved by breaking up 2d state array) - university is working
- Add adding resources with a hidden form that is smooth and easily accessible
- Add upvote/downvote for resources and comment section 
- Add edit resources
- Add auth exclusive to university students
- Server side form validation
