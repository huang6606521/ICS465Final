import { Template } from 'meteor/templating';

Template.App_Body.onCreated(function appBodyOnCreated() {
  // placeholder: typically you will put global subscriptions here if you remove the autopublish package.
});

Template.App_Body.helpers({
  authInProcess: function authInProcess() {
    return Meteor.loggingIn();
  },
  canShow: function canShow() {
    return !!Meteor.user();
  },
});

Template.App_Body.events({
 // placeholder: if you add a form to this top-level layout, handle the associated events here.
});
