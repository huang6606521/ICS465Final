import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Sessions } from '../../api/sessions/sessions.js';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Users } from '../../api/users/users.js';

Template.Study_Session_Detail_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Sessions');
    this.subscribe('Users');
  });
});

Template.Study_Session_Detail_Page.helpers({
  findSession(){
    return Sessions.findOne(FlowRouter.getParam('_id'));
  },
  getDuration(session){
    return session.endV - session.startV;
  },
  hasJoined(){
    const guestListPros = Sessions.findOne(FlowRouter.getParam('_id')).guestsPros;
    const guestListStuds = Sessions.findOne(FlowRouter.getParam('_id')).guestsStuds;
    if ((_.contains(guestListPros, Meteor.user().profile.name)) || (_.contains(guestListStuds, Meteor.user().profile.name))) {
      return true;
    }
    return false;
  },
  isCreator(){
    if (Sessions.findOne(FlowRouter.getParam('_id')).name == Meteor.user().profile.name) {
      return true;
    }
    return false;
  },
  findUserId(guest){
    return Users.findOne({ username: guest })._id;
  },
  isPro(){
    const guestListPros = Sessions.findOne(FlowRouter.getParam('_id')).guestsPros;
    return _.contains(guestListPros, Meteor.user().profile.name);
  },
  hasTutorial(){
    return Users.findOne({ username: Meteor.user().profile.name }).tutorial;
  }
});

Template.Study_Session_Detail_Page.events({
  'submit .add-topic'(event){
    event.preventDefault();
    const topic = event.target.addTopic.value;
    const topics = Sessions.findOne(FlowRouter.getParam('_id')).topic;
    if((_.contains(topics, topic) == false) && (topic != '') && (topic != ' ')) {
      Sessions.update(
          { _id: FlowRouter.getParam('_id') },
          { $push: { topic: topic}  });
      event.target.addTopic.value = '';
      FlowRouter.reload();
    }
  },
  'click .remove.circle.icon'(event){
    event.preventDefault();
    Sessions.update(
        { _id: FlowRouter.getParam('_id') },
        { $pull: { topic: event.target.id}  });
    FlowRouter.reload();
  },
  'click .join-pro'(event){
    event.preventDefault();
    const guestList = Sessions.findOne(FlowRouter.getParam('_id')).guestsPros;
    if(_.contains(guestList, Meteor.user().profile.name) == false) {
      Sessions.update(
          { _id: FlowRouter.getParam('_id') },
          { $push: { guestsPros: Meteor.user().profile.name}  });
      FlowRouter.reload();
    }
  },
  'click .join-stud'(event){
    event.preventDefault();
    const guestList = Sessions.findOne(FlowRouter.getParam('_id')).guestsStuds;
    if(_.contains(guestList, Meteor.user().profile.name) == false) {
      Sessions.update(
          { _id: FlowRouter.getParam('_id') },
          { $push: { guestsStuds: Meteor.user().profile.name}  });
      FlowRouter.reload();
    }
  },
  'click .leave'(event){
    event.preventDefault();
    const guestListPros = Sessions.findOne(FlowRouter.getParam('_id')).guestsPros;
    const guestListStuds = Sessions.findOne(FlowRouter.getParam('_id')).guestsStuds;
    if (_.contains(guestListPros, Meteor.user().profile.name)) {
      Sessions.update(
          { _id: FlowRouter.getParam('_id') },
          { $pull: { guestsPros: Meteor.user().profile.name } });
      FlowRouter.reload();
    } else
      if (_.contains(guestListStuds, Meteor.user().profile.name)) {
        Sessions.update(
            { _id: FlowRouter.getParam('_id') },

            { $pull: { guestsStuds: Meteor.user().profile.name } });
        FlowRouter.reload();
      }
  },
  'click .delete'(event){
    event.preventDefault();
    Sessions.remove(FlowRouter.getParam('_id'));
    FlowRouter.go('Calendar_Page');
  }
});
