var PeopleTracker = window.PeopleTracker = window.PeopleTracker || {};

PeopleTracker.Person = function (opts) {
  this.fname = opts.fname;
  this.lname = opts.lname;
  this.mid = opts.mid;
  this.dob = new Date(opts.dob);
  this.sex = opts.sex;
  this.fcolor = opts.fcolor;
};
PeopleTracker.Person.prototype.toString = function () {
  var string = "";
  string += this.lname + " ";
  string += this.fname + " ";
  string += this.sex + " ";
  string += this.dob.toLocaleDateString() + " ";
  string += this.fcolor;
  return string;
};
