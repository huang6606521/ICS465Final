import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Users } from '../../api/users/users.js';

Template.Header.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Users');
  });
});

Template.Header.helpers({
  isAdmin(){
    return Users.findOne({ username: Meteor.user().profile.name }).admin;
  },
  tutorials(){
    return Users.findOne({ username: Meteor.user().profile.name }).tutorial;
  }
});

Template.Header.events({
  'click .tutorials-on'(event) {
    console.log("tutorials on");
    event.preventDefault();
    Users.update(
        { _id: Users.findOne({ username: Meteor.user().profile.name })._id },
        { $set: { tutorial: true  }}
    );
    $('.dropdown').dropdown('restore defaults');
  },
  'click .tutorials-off'(event) {
    console.log("tutorials off");
    event.preventDefault();
    Users.update(
        { _id: Users.findOne({ username: Meteor.user().profile.name })._id },
        { $set: { tutorial: false } }
    );
    $('.dropdown').dropdown('restore defaults');
  },
});
