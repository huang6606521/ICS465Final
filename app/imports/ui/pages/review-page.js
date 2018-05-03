import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Reviews } from '../../api/reviews/reviews.js';
import { Users } from '../../api/users/users.js';

Template.Review_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Reviews');
    this.subscribe('Users');
  });
});

Template.Review_Page.helpers({
  reviewsList() {
    const reviewData = Reviews.findOne(FlowRouter.getParam('_id'));
    console.log('Review List');
    console.log(reviewData.userReviews);
    return reviewData.userReviews;
  },
  hasTutorial(){
    return Users.findOne({ username: Meteor.user().profile.name }).tutorial;
  },
  isForUser(){
    if( Meteor.user().profile.name === Reviews.findOne(FlowRouter.getParam('_id')).forUser) {
      return true;
    }
    else{
      return false;
    }
  },
});

Template.Review_Page.events({
  'click .create-review-button'(event, instance) {
    $('.ui.modal.create-review-modal')
        .modal('show')
    ;
  },
});