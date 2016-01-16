describe("PeopleTracker integration", function () {
  var buttons, interface1, interface2, tracker, output;
  beforeEach(function () {
    loadFixtures('../../../index.html');
    buttons = $('button');
    fileselect = $('input');

    interface = new PeopleTracker.Interface(buttons, fileselect);
    tracker = interface.tracker;
    jasmine.Ajax.install();


  });
  afterEach(function() {
     jasmine.Ajax.uninstall();
   });

  it("generates complete output that matches original specification.", function() {
    jasmine.Ajax.stubRequest('/data/comma.txt').andReturn({
      "responseText": "Abercrombie, Neil, Male, Tan, 2/13/1943\n" +
      "Bishop, Timothy, Male, Yellow, 4/23/1967\n" +
      "Kelly, Sue, Female, Pink, 7/12/1959"
    });
    jasmine.Ajax.stubRequest('/data/pipe.txt').andReturn({
      "responseText": "Smith | Steve | D | M | Red | 3-3-1985\n" +
      "Bonk | Radek | S | M | Green | 6-3-1975\n" +
      "Bouillon | Francis | G | M | Blue | 6-3-1975\n"
    });
    jasmine.Ajax.stubRequest('/data/space.txt').andReturn({
      "responseText": "Kournikova Anna F F 6-3-1975 Red\n" +
      "Hingis Martina M F 4-2-1979 Green\n" +
      "Seles Monica H F 12-2-1973 Black"
    });

    interface.commaInput();
    interface.pipeInput();
    interface.spaceInput();
    interface.output1();
    output = $('#output')[0].innerHTML;

      expect(output).toEqual(
        "Hingis Martina Female 4/2/1979 Green\n" +
        "Kelly Sue Female 7/12/1959 Pink\n" +
        "Kournikova Anna Female 6/3/1975 Red\n" +
        "Seles Monica Female 12/2/1973 Black\n" +
        "Abercrombie Neil Male 2/13/1943 Tan\n" +
        "Bishop Timothy Male 4/23/1967 Yellow\n" +
        "Bonk Radek Male 6/3/1975 Green\n" +
        "Bouillon Francis Male 6/3/1975 Blue\n" +
        "Smith Steve Male 3/3/1985 Red"
      );
      interface.output2();
      output = $('#output')[0].innerHTML;
      expect(output).toEqual(
        "Abercrombie Neil Male 2/13/1943 Tan\n" +
        "Kelly Sue Female 7/12/1959 Pink\n" +
        "Bishop Timothy Male 4/23/1967 Yellow\n" +
        "Seles Monica Female 12/2/1973 Black\n" +
        "Bonk Radek Male 6/3/1975 Green\n" +
        "Bouillon Francis Male 6/3/1975 Blue\n" +
        "Kournikova Anna Female 6/3/1975 Red\n" +
        "Hingis Martina Female 4/2/1979 Green\n" +
        "Smith Steve Male 3/3/1985 Red"
      );
      interface.output3();
      output = $('#output')[0].innerHTML;
      expect(output).toEqual(
        "Smith Steve Male 3/3/1985 Red\n" +
        "Seles Monica Female 12/2/1973 Black\n" +
        "Kournikova Anna Female 6/3/1975 Red\n" +
        "Kelly Sue Female 7/12/1959 Pink\n" +
        "Hingis Martina Female 4/2/1979 Green\n" +
        "Bouillon Francis Male 6/3/1975 Blue\n" +
        "Bonk Radek Male 6/3/1975 Green\n" +
        "Bishop Timothy Male 4/23/1967 Yellow\n" +
        "Abercrombie Neil Male 2/13/1943 Tan"
      );

  });

});
