
var PeopleTracker = window.PeopleTracker = window.PeopleTracker || {};

PeopleTracker.Tracker = function () {
  this.people = [];
};

PeopleTracker.Tracker.prototype.handleInput = function (lineArray) {
  var delimiter;
  if (lineArray[0].indexOf('|') !== -1 ) {
    delimiter = " | ";
  } else if (lineArray[0].indexOf(',') !== -1 ) {
    delimiter = ", ";
  } else {
    delimiter = " ";
  }
  lineArray.forEach(function (el) {
    this.people.push(this.parseInput(el, delimiter));
  }.bind(this));
};
PeopleTracker.Tracker.prototype.addPerson = function (person) {
  this.people.push(person);
};
PeopleTracker.Tracker.prototype.parseInput = function (string, delimiter) {
  var array = string.split(delimiter);
  var opts;

  if (delimiter === " | ") {
    opts = {
      "lname": array[0],
      "fname": array[1],
      "mid": array[2],
      "sex": array[3][0] === "M" ? "Male" : "Female",
      "fcolor": array[4],
      "dob": array[5]
    };
  } else if (delimiter === ", ") {
    opts = {
      "lname": array[0],
      "fname": array[1],
      "mid": "",
      "sex": array[2][0] === "M" ? "Male" : "Female",
      "fcolor": array[3],
      "dob": array[4]
    };
  } else if (delimiter === " ") {
    opts = {
      "lname": array[0],
      "fname": array[1],
      "mid": array[2],
      "sex": array[3][0] === "M" ? "Male" : "Female",
      "fcolor": array[5],
      "dob": array[4]
    };
  } else {
    throw "Invalid delimiter.";
  }

  return new PeopleTracker.Person(opts);
};
PeopleTracker.Tracker.prototype.output = function (opts) {
  var people = $.extend([], this.people);
  var output = "";
  $.each(opts, function (column, order) {
    people.sort(function (a, b) {
      if (order === "asc") {
        return a[column] > b[column];
      } else {
        return a[column] < b[column];
      }
    });
  });
  people.forEach(function (person, index) {
    output += person.toString();
    if (index < people.length -1) {
      output += "\n";
    }
  });
  return output;
};
