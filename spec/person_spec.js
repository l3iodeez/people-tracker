
describe("PeopleTracker.Person", function() {
  var opts = {
    "lname": "Smith",
    "fname": "Bob",
    "mid": "L",
    "sex": "M",
    "fcolor": "Blue",
    "dob": new Date("01/01/1981")
  };
  var person =  new PeopleTracker.Person(opts);

  it("is a function", function() {
    expect(typeof PeopleTracker.Person).toEqual("function");
  });
  it("constructs an object using the passed options object", function() {
      expect(typeof person).toEqual("object");
      expect(person.fname).toEqual("Bob");
      expect(person.lname).toEqual("Smith");
      expect(person.mid).toEqual("L");
      expect(person.dob.toString).toEqual(new Date("03/03/1985").toString);
      expect(person.sex).toEqual("M");
      expect(person.fcolor).toEqual("Blue");
  });

});

describe("PeopleTracker.Person.prototype.toString", function() {
  var opts = {
    "lname": "Smith",
    "fname": "Bob",
    "mid": "L",
    "sex": "Male",
    "fcolor": "Blue",
    "dob": new Date("01/01/1981")
  };
  var person =  new PeopleTracker.Person(opts);
  it("outputs a string in the correct format", function() {
    expect(person.toString()).toEqual("Smith Bob Male 1/1/1981 Blue");
  });
});
