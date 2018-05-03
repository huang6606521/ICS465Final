import { Template } from 'meteor/templating';
import { Users } from '../../api/users/users.js';

Template.Studs_Pros_Page.helpers({

  /**
   * @returns {*} All of the Contacts documents.
   */
  sessionsList() {
    return Users.find();
  },

  search() {
    // Get the search value that was submitted.
    let searchValue = Session.get("searchValue");
    // Search the Sessions collection for any sessions with the same name as searchValue and return it.
    if(searchValue){
      return Users.find({ course: searchValue});}
    else{
      return  Users.find();
    }
  }
});

Template.Studs_Pros_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Users');
  });

});

Template.Studs_Pros_Page.events({
  "submit #search": function (e) {
    e.preventDefault();
    Session.set("searchValue", $("#searchValue").val());

  }
});
