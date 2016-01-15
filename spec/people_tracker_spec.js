describe("PeopleTracker", function() {

  it("is an object in the global namespace", function() {
      expect(typeof window.PeopleTracker).toEqual("object");
  });

});

describe("PeopleTracker.Tracker", function() {

  it("is a function", function() {
    expect(typeof PeopleTracker.Tracker).toEqual("function");
  });
  it("constructs an object", function() {
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
  it("adds a person to the store", function() {
    expect(tracker.people[0]).toEqual(bob);
  });
});

describe("PeopleTracker.Tracker.prototype.parseInput", function() {
  var tracker = new PeopleTracker.Tracker(),
    neil = "Abercrombie, Neil, Male, Tan, 2/13/1943",
    steve = "Smith | Steve | D | M | Red | 3-3-1985",
    anna = "Kournikova Anna F F 6-3-1975 Red";
    it("raises an error if given and invalid delimiter", function () {
      expect(function () {
        tracker.parseInput(neil, "$");
      }).toThrow("Invalid delimiter");
    });

    it("parses comma delimited strings", function() {
      var person = tracker.parseInput(neil, ", ");
        expect(person.fname).toEqual("Neil");
        expect(person.lname).toEqual("Abercrombie");
        expect(person.mid).toEqual("");
        expect(person.dob.toString).toEqual(new Date("2/13/1943").toString);
        expect(person.sex).toEqual("M");
        expect(person.fcolor).toEqual("Tan");
    });

  it("parses pipe delimited strings", function() {
    var person = tracker.parseInput(steve, " | ");
    expect(person.fname).toEqual("Steve");
    expect(person.lname).toEqual("Smith");
    expect(person.mid).toEqual("D");
    expect(person.dob.toString).toEqual(new Date("03/03/1985").toString);
    expect(person.sex).toEqual("M");
    expect(person.fcolor).toEqual("Red");
  });

  it("parses space delimited strings", function() {
    var person = tracker.parseInput(anna, " ");
    expect(person.fname).toEqual("Anna");
    expect(person.lname).toEqual("Kournikova");
    expect(person.mid).toEqual("F");
    expect(person.dob.toString).toEqual(new Date("06/03/1975").toString);
    expect(person.sex).toEqual("F");
    expect(person.fcolor).toEqual("Red");
  });

});



// - Tracker
//   - Keeps track of data in the form of Persons.
//   - Parses data and creates Person objects.
//   - Performs sorts and generates output.
// - Interface
//   - Sets up event listeners to handle user input.
//   - Converts text file to JS array and passes it to Tracker.
//   - Renders output to markup.
// - Person
//   - Keeps track of all parameters of a person
//   - Has a unique ID number
