# PeopleTracker
## Cyrus Innovation Code Test
 - [Live link]
 - [Test link]
 - [Repository link]

##### Submitted on 01/XX/16 by:
  - Henry Dotson
  - Email: henry.d.dotson@gmail.com
  - Cell: 646-301-5604
  - [Github] - [Web] - [LinkedIn]

### Usage Instructions.
  - Open index.html in your browser or click [here][Live Link].
  - Use the form to select an input file and load it.
  - Load any additional files, then click one of the output buttons.
  - Output will appear in the text area marked "output" .

### Running Tests
  - Run `nodejs server.js` to start the local express server
  - Open `SpecRunner.html` in your browser or click [here][Test Link].
  - Note: Using the node server is only necessary to run the UI tests. If  you
  open index.html locally the application will work, but all UI tests will fail
  (this is because of browser restrictions when working on the local filesystem).
  To run UI tests either run the express server  locally or use the [live link][Test link]


### Project Description

This project is an in-browser javascript application that is designed to accept
input files representing data about different people and return output sorted in
various orders. Input files can use spaces (' '), commas (',') , or pipes ('|')
as delimiters.

#### Object Classes

- PeopleTracker
  - Container namespace
- Tracker
  - Parses data and creates Person objects.
  - Keeps track of data in the form of Persons.
  - Performs sorts and generates output.
- Interface
  - Sets up event listeners to handle user input.
  - Converts text file to JS array.
  - Renders output to markup.
- Person
  - Keeps track of all parameters of a person
  - Has a unique ID number

#### Libraries used
  - Jasmine
  - jQuery

[Github]: https://github.com/l3iodeez
[LinkedIn]: https://www.linkedin.com/in/henry-dotson-5511718
[Web]: http://www.hdotson.com
[Live Link]: http://www.hdotson.com/people-tracker
[Test Link]: http://www.hdotson.com/people-tracker/SpecRunner.html
[Repository link]: https://github.com/l3iodeez/people-tracker
