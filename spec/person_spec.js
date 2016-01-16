
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

  it("is a function.", function() {
    expect(typeof PeopleTracker.Person).toEqual("function");
  });
  it("constructs an object using the passed options object.", function() {
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
  var bobOpts = {
    "lname": "Smith",
    "fname": "Bob",
    "mid": "L",
    "sex": "Male",
    "fcolor": "Blue",
    "dob": new Date("01/01/1981")
  };
  var aliceOpts = {
    "lname": "Jones",
    "fname": "Alice",
    "mid": "L",
    "sex": "Female",
    "fcolor": "Yellow",
    "dob": new Date("04/02/1979")
  };
  bob =  new PeopleTracker.Person(bobOpts);
  alice = new PeopleTracker.Person(aliceOpts);
  it("outputs a string in the correct format.", function() {
    expect(bob.toString()).toEqual("Smith Bob Male 1/1/1981 Blue");
  });
  it("gets around JavaScript DST weirdness.", function() {
    expect(alice.toString()).toEqual("Jones Alice Female 4/2/1979 Yellow");
  });
});
