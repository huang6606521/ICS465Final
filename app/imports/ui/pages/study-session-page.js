import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Sessions } from '../../api/sessions/sessions.js';
import { Users } from '../../api/users/users.js';

/*
 *  Name:         onCreated: Study_Session_Page
 *
 *  Description:  Subscribe to "Sessions" and "Users" collections.
 */
Template.Study_Session_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Sessions');
    this.subscribe('Users');
  });
  Session.set("sort", 0);
});

/*
 *  Name:         onRendered: Study_Session_Page
 *
 *  Description:  Enable Semantic UI dropdown.
 */
Template.Study_Session_Page.onRendered(function enableSemantic() {
  this.$('.ui.dropdown').dropdown();
});

Template.Study_Session_Page.helpers({
  /*
   *  Function name:    search
   *
   *  Description:      Get the searchValue from the form submission. Search the Sessions collection for courses,
   *                    titles, or topics matching the given search string. Search is case insensitive and also searches
   *                    partial strings. Returns all Sessions when given an empty string.
   *
   *  Parameters:       None
   *
   *  Input:            searchValue: string from the form submission.
   *
   *  Return values:    Cursor to all Sessions matching the search criteria.
   */
  search() {
    console.log("in search");
    // Get the search value that was submitted.
    const searchValue = Session.get("searchValue");
    const sort = Session.get("sort");

    console.log("sort in search: " + sort);
    if (sort === 0){
      return Sessions.find({ $or: [ { course: new RegExp(searchValue, 'i') }, { title: new RegExp(searchValue, 'i') }, { topic: new RegExp(searchValue, 'i') } ] }, {sort: {date: 1, start: 1, course: 1}} );
    } else if (sort === 1) {
      return Sessions.find({ $or: [ { course: new RegExp(searchValue, 'i') }, { title: new RegExp(searchValue, 'i') }, { topic: new RegExp(searchValue, 'i') } ] }, {sort: {course: 1, date: 1, start: 1}} );
    } else {
      return Sessions.find({ $or: [ { course: new RegExp(searchValue, 'i') }, { title: new RegExp(searchValue, 'i') }, { topic: new RegExp(searchValue, 'i') } ] }, {sort: {course: -1, date: 1, start: 1}} );
    }

    // Search the Sessions collection for any sessions with the same course, title, or topic.

  },

  /*
   *  Function name:    hasTutorial
   *
   *  Description:      Checks if the current user has tutorial mode enabled.
   *
   *  Parameters:       None
   *
   *  Input:            Meteor username/UH username
   *
   *  Return values:    boolean:  true - user tutorial enabled
   *                              false - user tutorial disabled
   */
  hasTutorial(){
    return Users.findOne({ username: Meteor.user().profile.name }).tutorial;
  },
});

Template.Study_Session_Page.events({
  /*
   *  Description:  Executes when the user presses the "Search" button. Receives the submitted search value and stores it
   *  in the current Session.
   */
  'submit #search': function (e) {
    e.preventDefault();
    Session.set("searchValue", $("#searchValue").val());
  },
  /*
   *  Description:  Executes when the user presses the "Reset Search" button. Resets the search, by searching for an
   *                empty string, which will return all Sessions.
   */
  'click .reset'(event){
    event.preventDefault();
    Session.set("searchValue", "");
  },
  'click .item'(event){
    event.preventDefault();

    const sortItem = document.getElementById("sortItem").innerHTML;
    if(sortItem === "Date"){
      console.log("Date");
      Session.set("sort", 0);
    } else if (sortItem === "Course Number (Low to High)") {
      console.log("Course Number (Low to High)");
      Session.set("sort", 1);
    } else if (sortItem === "Course Number (High to Low)"){
      console.log("Course Number (High to Low)");
      Session.set("sort", 2);
    }
  }
});
