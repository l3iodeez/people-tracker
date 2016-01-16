describe("PeopleTracker", function() {

  it("is an object in the global namespace.", function() {
      expect(typeof window.PeopleTracker).toEqual("object");
  });

});

describe("PeopleTracker.Tracker", function() {

  it("is a function.", function() {
    expect(typeof PeopleTracker.Tracker).toEqual("function");
  });
  it("constructs an object.", function() {
      expect(typeof new PeopleTracker.Tracker()).toEqual("object");
  });

});

describe("PeopleTracker.Tracker.prototype.addPerson", function() {

  var bob = {
    "fname": "Bob",
    "lname": "Smith",
    "mid": "L",
    "dob": "01/01/1981",
    "sex": "M",
    "fcolor": "Blue"
  };
  var tracker = new PeopleTracker.Tracker();
  tracker.addPerson(bob);
  it("adds a person to the store.", function() {
    expect(tracker.people[0]).toEqual(bob);
  });
});

describe("PeopleTracker.Tracker.prototype.handleInput", function() {
  var tracker, comma, pipe, space, steve;
  beforeEach(function() {
     tracker = new PeopleTracker.Tracker();
      comma = ["Abercrombie, Neil, Male, Tan, 2/13/1943", "Bishop, Timothy, Male, Yellow, 4/23/1967"];
      pipe = ["Smith | Steve | D | M | Red | 3-3-1985"];
      space = ["Kournikova Anna F F 6-3-1975 Red"];
      steve = {
        "fname": "Steve",
        "lname": "Smith",
        "mid": "D",
        "dob": "01/01/1981",
        "sex": "M",
        "fcolor": "Blue"
      };
  });

  it("detemines the correct delimiter and calls parseInput.", function () {
    spyOn(tracker, "parseInput");
    tracker.handleInput(pipe);
    expect(tracker.parseInput).toHaveBeenCalledWith("Smith | Steve | D | M | Red | 3-3-1985", " | ");
  });

  it("calls parseInput for each member of the passed input array.", function () {
    spyOn(tracker, "parseInput");
    tracker.handleInput(comma);
    var count = tracker.parseInput.calls.count();
    expect(tracker.parseInput).toHaveBeenCalledWith("Abercrombie, Neil, Male, Tan, 2/13/1943", ", ");
    expect(tracker.parseInput).toHaveBeenCalledWith("Bishop, Timothy, Male, Yellow, 4/23/1967", ", ");
    expect(count).toEqual(2);
  });

  it("stores the parsed result.", function () {
    tracker.handleInput(pipe);
    expect(tracker.people.length).toEqual(1);
  });
});


describe("PeopleTracker.Tracker.prototype.parseInput", function() {
  var tracker = new PeopleTracker.Tracker(),
    neil = "Abercrombie, Neil, Male, Tan, 2/13/1943",
    steve = "Smith | Steve | D | M | Red | 3-3-1985",
    anna = "Kournikova Anna F F 6-3-1975 Red";

  it("raises an error if given an invalid delimiter.", function () {
    expect(function () {
      tracker.parseInput(neil, "$");
    }).toThrow("Invalid delimiter.");
  });

  it("returns an object.", function() {
    var person = tracker.parseInput(neil, ", ");
      expect(typeof person).toEqual("object");
  });

  it("parses comma delimited strings.", function() {
    var person = tracker.parseInput(neil, ", ");
      expect(person.fname).toEqual("Neil");
      expect(person.lname).toEqual("Abercrombie");
      expect(person.mid).toEqual("");
      expect(person.dob.toString).toEqual(new Date("2/13/1943").toString);
      expect(person.sex).toEqual("Male");
      expect(person.fcolor).toEqual("Tan");
  });

  it("parses pipe delimited strings.", function() {
    var person = tracker.parseInput(steve, " | ");
    expect(person.fname).toEqual("Steve");
    expect(person.lname).toEqual("Smith");
    expect(person.mid).toEqual("D");
    expect(person.dob.toString).toEqual(new Date("03/03/1985").toString);
    expect(person.sex).toEqual("Male");
    expect(person.fcolor).toEqual("Red");
  });

  it("parses space delimited strings.", function() {
    var person = tracker.parseInput(anna, " ");
    expect(person.fname).toEqual("Anna");
    expect(person.lname).toEqual("Kournikova");
    expect(person.mid).toEqual("F");
    expect(person.dob.toString).toEqual(new Date("06/03/1975").toString);
    expect(person.sex).toEqual("Female");
    expect(person.fcolor).toEqual("Red");
  });
});

describe("PeopleTracker.Tracker.prototype.output", function() {
  var tracker, neil, steve, anna;
  beforeEach(function() {
     tracker = new PeopleTracker.Tracker();
      neil = ["Abercrombie, Neil, Male, Tan, 2/13/1943"];
      steve = ["Smith | Steve | D | M | Red | 3-3-1985"];
      anna = ["Kournikova Anna F F 6-3-1975 Red"];
      tracker.handleInput(neil);
      tracker.handleInput(steve);
      tracker.handleInput(anna);
  });


  it("outputs results properly sorted by gender, then last name ascending.", function() {
      expect(tracker.output({"lname":"asc", "sex": "asc"})).toEqual(
        "Kournikova Anna Female 6/3/1975 Red\nAbercrombie Neil Male 2/13/1943 Tan\nSmith Steve Male 3/3/1985 Red"
      );
  });
  it("outputs results properly sorted by birthdate, then last name ascending.", function() {
      expect(tracker.output({"lname":"asc","dob": "asc"})).toEqual(
        "Abercrombie Neil Male 2/13/1943 Tan\nKournikova Anna Female 6/3/1975 Red\nSmith Steve Male 3/3/1985 Red"
      );
  });
  it("outputs results properly sorted by last name descending.", function() {
      expect(tracker.output({"lname":"dsc"})).toEqual(
        "Smith Steve Male 3/3/1985 Red\nKournikova Anna Female 6/3/1975 Red\nAbercrombie Neil Male 2/13/1943 Tan"
      );
  });

});




// - Tracker
//   - Keeps track of data in the form of Persons.
//   - Parses data and creates Person objects.
//   - Performs sorts and generates output.
// - Interface
//   - Sets up event listeners to handle user input.
//   - Makes AJAX request to retrieve files.
//   - Converts text file to JS array and passes it to Tracker.
//   - Renders output to markup.
// - Person
//   - Keeps track of all parameters of a person
//   - Has a unique ID number
