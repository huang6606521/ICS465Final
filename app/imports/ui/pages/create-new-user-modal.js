import {Template} from 'meteor/templating';
import {Users, UsersSchema} from '../../api/users/users.js';
import {Reviews, ReviewsSchema} from '../../api/reviews/reviews.js';
import {_} from 'meteor/underscore';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';

const displayErrorMessages = 'displayErrorMessages';

Template.Create_New_User_Modal.onRendered(function enableSemantic() {
  this.$('.ui.checkbox').checkbox();
  this.$('.ui.accordion').accordion();
});

Template.Create_New_User_Modal.onCreated(function onCreated() {
  let template = Template.instance().subscribe('Users').ready();
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = UsersSchema.namedContext('Create_New_User_Modal');
})

Template.Create_New_User_Modal.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayFieldError(fieldName) {
    const errorKeys = Template.instance().context.invalidKeys();
    return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
  },
});

Template.Create_New_User_Modal.events({
  'submit .new-user'(event, instance) {
    event.preventDefault();
    const firstname = event.target.firstname.value;
    const lastname = event.target.lastname.value;
    const username = Meteor.user().profile.name;
    let profilePicture = 'images/CSLogo1.png';
    if (event.target.profilePicture.value != '' ) {
      profilePicture = event.target.profilePicture.value;
    }
        // event.target.profilePicture.value;
    const terms = document.getElementById('Terms').checked;
    const admin = false;
    const tutorial = true;
    const interests = event.target.interests.value;

    const newUser = { firstname, lastname, username, profilePicture, terms, admin, tutorial, interests}

    // Create new reviews
    let forUser = Meteor.user().profile.name;
    let userReviews = [];
    const newReviews = { forUser, userReviews };

    Reviews.insert(newReviews);

    instance.context.resetValidation();
    UsersSchema.clean(newUser);
    instance.context.validate(newUser);
    if (instance.context.isValid() && terms) {
      Users.insert(newUser);
      console.log(newUser);
      instance.messageFlags.set(displayErrorMessages, false);
      $('#newUser').modal('hide');
    } else {
      console.log('invalid');
      instance.messageFlags.set(displayErrorMessages, true);
    }
    // const e = document.getElementById('pros');
    // const f = e.getElementsByTagName('input');
    // const l = _.map(_.filter(f, function(checkbox) { return checkbox.checked == true }), function(checkbox) {return checkbox.value;});
    // const pros = f[0].value;
    // console.log(l);

  },
});