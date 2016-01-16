
describe("PeopleTracker.Interface", function() {
  var buttons, interface1, interface2;
  beforeEach(function () {
    loadFixtures('../../../index.html');
    buttons = $('button');
    fileselect = $('input');

    interface1 = new PeopleTracker.Interface(buttons, fileselect);
    interface2 = new PeopleTracker.Interface(buttons, fileselect);


  });

  afterEach(function () {
    PeopleTracker.current = undefined;
  });

  it("is a function.", function() {
    expect(typeof PeopleTracker.Interface).toEqual("function");
  });

  it("generates an interface object and sets it to the 'current' method on the global namespace.", function() {
    expect(PeopleTracker.current).toEqual(interface1);
  });

  it("uses lazy loading.", function() {
    expect(interface1 === interface2).toEqual(true);
  });

  it("attaches event listeners to UI buttons.", function() {
    buttons.each(function (idx, button) {
      expect(typeof button.onclick).toEqual("function");
    });
  });

});
