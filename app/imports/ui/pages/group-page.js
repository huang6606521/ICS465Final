import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Groups } from '../../api/groups/groups.js';
import { Users } from '../../api/users/users.js';

Template.Group_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Groups');
    this.subscribe('Users');
  });
});

Template.Group_Page.helpers({
  groupsList() {
    return Groups.find();
  },
  isMember(group){
    let search = _.find(group['members'], function (user) {
      return user == Meteor.user().profile.name;
    });
    if (search != undefined) {
      return true;
    }
    else{
      return false;
    }
  },
  groupDataField(fieldName) {
    const groupData = Groups.findOne(FlowRouter.getParam('_id'));
    // See https://dweldon.silvrback.com/guards to understand '&&' in next line.
    return groupData && groupData[fieldName];
  },
  hasTutorial(){
    return Users.findOne({ username: Meteor.user().profile.name }).tutorial;
  }
});

Template.Group_Page.events({
  'click .create-group'(event, instance) {
    $('.ui.modal.groups-modal')
        .modal('show')
    ;
  },
});
