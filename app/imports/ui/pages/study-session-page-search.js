import {Template} from 'meteor/templating';
import {Sessions} from '../../api/sessions/sessions.js';



Template.Study_Session_Page_Search.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Sessions');

  });
});




Template.Study_Session_Page_Search.events({
  "submit #search": function (e) {
    e.preventDefault();
    Session.set("searchValue", $("#searchValue").val());
    console.log(e);
  }
});

Template.Study_Session_Page_Search.helpers({
  search() {
    // Get the search value that was submitted.
    let searchValue = Session.get("searchValue");
    // Search the Sessions collection for any sessions with the same name as searchValue and return it.
    return Sessions.find({ course: searchValue});
  }
});


