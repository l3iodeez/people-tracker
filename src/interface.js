var PeopleTracker = window.PeopleTracker = window.PeopleTracker || {};

PeopleTracker.Interface = function (buttons, fileselect) {
  if (PeopleTracker.current) {
    return PeopleTracker.current;
  }
  this.buttons = buttons;
  this.fileselect = fileselect;
  this.tracker = new PeopleTracker.Tracker();
  this.reader = new FileReader();
  this.reader.onload = this.readFile;
  this.status = "";
  this.loadedFiles = [];

  PeopleTracker.current = this;
  buttons.each(function (idx, button_obj) {
    button_obj.onclick = this.handleClick;
  }.bind(this));
};


PeopleTracker.Interface.prototype.handleClick = function (evt) {
  evt.preventDefault();
  evt.stopPropagation();
  var current = PeopleTracker.current;
  switch (evt.currentTarget.id) {
    case "upload":
      current.uploadFiles();
      break;
    case "comma-input":
      current.commaInput();
      break;
    case "pipe-input":
      current.pipeInput();
      break;
    case "space-input":
      current.spaceInput();
      break;
    case "output-1":
      current.output1();
      break;
    case "output-2":
      current.output2();
      break;
    case "output-3":
      current.output3();
      break;
    case "custom-asc":
      current.customOutput("asc");
      break;
    case "custom-dsc":
      current.customOutput("dsc");
      break;
  }
};

PeopleTracker.Interface.prototype.uploadFiles = function () {

  $.each(this.fileselect.files, function (idx, file) {
    if (this.loadedFiles.indexOf(file.name) !== -1) {
      this.status = "This file is already loaded.";
      this.updateStatus();
      return;
    }
    this.loadedFiles.push(file.name);
    this.reader = new FileReader();
    this.reader.onload = this.readFile;
    this.reader.readAsText(file);
  }.bind(this));
  $("#fileselect").replaceWith($("#fileselect").clone(true));
  this.fileselect = $("#fileselect")[0];
};

PeopleTracker.Interface.prototype.readFile = function (file) {
  var lines;
  if (typeof file === "string") {
    lines = file.split("\n");
  } else {
    lines = PeopleTracker.current.reader.result.split("\n");
  }
  lines = lines.filter(function (line) {
    return line.length > 0;
  });
  PeopleTracker.current.tracker.handleInput(lines);
  PeopleTracker.current.updateStatus();
};
PeopleTracker.Interface.prototype.updateStatus = function () {
  $('#record-count')[0].innerHTML = this.tracker.people.length;
  $('#status-line')[0].innerHTML = this.status;
};
PeopleTracker.Interface.prototype.getfile = function (filename) {
  if (this.loadedFiles.indexOf(filename) !== -1) {
    this.status = "This file is already loaded.";
    this.updateStatus();
    return;
  }

  this.loadedFiles.push(filename);
  this.status = "";
  $.ajax({
        url: '/data/' + filename,
        type: 'GET',
        dataType: 'text',
        success: function (file) {
          PeopleTracker.current.readFile(file);
        }
  });
};
PeopleTracker.Interface.prototype.commaInput = function () {
  this.getfile("comma.txt");
};
PeopleTracker.Interface.prototype.pipeInput = function () {
  this.getfile("pipe.txt");
};
PeopleTracker.Interface.prototype.spaceInput = function () {
  this.getfile("space.txt");
};
PeopleTracker.Interface.prototype.output1 = function () {
  $("#output")[0].innerHTML = this.tracker.output({"lname":"asc", "sex": "asc"});
};
PeopleTracker.Interface.prototype.output2 = function () {
  $("#output")[0].innerHTML = this.tracker.output({"lname":"asc", "dob": "asc"});
};
PeopleTracker.Interface.prototype.output3 = function () {
  $("#output")[0].innerHTML = this.tracker.output({"lname":"dsc"});
};
PeopleTracker.Interface.prototype.customOutput = function (order) {

  var column = $('#custom-sort')[0].value;
  var opts = {};
  opts[column] = order;
  $("#output")[0].innerHTML = this.tracker.output(opts);
};
