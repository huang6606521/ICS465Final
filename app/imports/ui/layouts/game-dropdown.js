import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Users } from '../../api/users/users.js';

Template.Game_Dropdown.helpers({
  tutorials(){
    return Users.findOne({ username: Meteor.user().profile.name }).tutorial;
  }
});

Template.Game_Dropdown.events({
  'click .snake'(event) {
    event.preventDefault();
    FlowRouter.go('Snake_Game_Page');
    $('.dropdown').dropdown('restore defaults');
  },
  'click .bubble'(event) {
    event.preventDefault();
    FlowRouter.go('Bubble_Page');
    $('.dropdown').dropdown('restore defaults');
  },
});

// Here's how to do the required initialization for Semantic UI dropdown menus.
Template.Game_Dropdown.onRendered(function enableDropDown() {
  this.$('.dropdown').dropdown();

});
