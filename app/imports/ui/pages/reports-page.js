import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Reviews } from '../../api/reviews/reviews.js';
import { Users } from '../../api/users/users.js';

Template.Reports_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Reviews');
    this.subscribe('Users');
  });
});

Template.Reports_Page.helpers({
  reviewsList() {
    return Reviews.find();
  },
  reviewsListChecked() {
    return Reviews.find({ checked: 0 });
  },
  hasTutorial(){
    return Users.findOne({ username: Meteor.user().profile.name }).tutorial;
  },
  isAdmin(){
    return Users.findOne({ username: Meteor.user().profile.name }).admin;
  }
});

Template.Reports_Page.events({
  'click .remove-button'(event) {
    event.preventDefault();
    Reviews.remove(event.target.id);
  },
  'click .allow-button'(event) {
    event.preventDefault();
    console.log('clicked allow-button');
    Reviews.update(
        {_id: event.target.id},
        {$set: {checked: 1} }
    );
  },
});