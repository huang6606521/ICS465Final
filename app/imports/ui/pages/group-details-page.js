import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Groups, GroupsSchema } from '../../api/groups/groups.js';
import { Users } from '../../api/users/users.js';
import { Sessions, SessionsSchema } from '../../api/sessions/sessions.js';

const displayErrorMessages = 'displayErrorMessages';

Template.Group_Details_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Groups');
    this.subscribe('Users');
    this.subscribe('Sessions');
  });
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = SessionsSchema.namedContext('Create_Study_Session_Page');
});

Template.Group_Details_Page.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayFieldError(fieldName) {
    const errorKeys = Template.instance().context.invalidKeys();
    return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
  },
  groupsList() {
    return Groups.find();
  },
  groupDataField(fieldName) {
    const groupData = Groups.findOne(FlowRouter.getParam('_id'));
    // See https://dweldon.silvrback.com/guards to understand '&&' in next line.
    return groupData && groupData[fieldName];
  },
  isLeader(){
    if( Meteor.user().profile.name === Groups.findOne(FlowRouter.getParam('_id')).leader) {
      return true;
    }
    else{
      return false;
    }
  },
  membersList() {
    const groupData = Groups.findOne(FlowRouter.getParam('_id'));
    // See https://dweldon.silvrback.com/guards to understand '&&' in next line.
    return groupData['members'];
  },
  postsList(){
    const groupData = Groups.findOne(FlowRouter.getParam('_id'));
    return groupData.posts.reverse();
  },
  hasTutorial(){
    return Users.findOne({ username: Meteor.user().profile.name }).tutorial;
  },
  getUserFirst(user) {
    return Users.findOne({ username: user }).firstname;
  },
  getUserLast(user) {
    return Users.findOne({ username: user }).lastname;
  },
  getUserAvatar(user) {
    return Users.findOne({ username: user }).profilePicture;
  },
  getUserId(user){
    return Users.findOne({ username: user })._id;
  },
});

Template.Group_Details_Page.events({
  'click .edit-group'(event, instance) {
    $('.ui.modal.edit-modal')
        .modal('show')
    ;
  },
  'click .remove-member'(event, instance) {
    if(event.target.id === Meteor.user().profile.name){
      $('.ui.modal.cannot-remove-modal')
          .modal('show')
      ;
    }
    else {
      $('.ui.modal.confirm-remove-modal')
          .modal('show')
          .modal({
            onApprove: function(){
              Groups.update(
                  { _id: FlowRouter.getParam('_id') },
                  { $pull: { members: event.target.id } });
            },
            onDeny: function(){
            }
          })
      ;
    }
  },
  'click .add-member'(event, instance) {
    $('.ui.modal.add-member-modal')
        .modal('show')
    ;
  },
  'submit .new-post'(event){
    event.preventDefault();

    const user = Meteor.user().profile.name;
    const post = event.target.post.value;
    const time = new Date();

    const newPost = {user, post, time};

    const groupID = FlowRouter.getParam('_id');
    Groups.update(
        { _id: groupID },
        { $push: { posts: newPost } });

    event.target.reset();
  },
  'submit .group-session-form'(event){
   // 'submit .group-session-form'(event, instance) {
    event.preventDefault();
    const month = event.target.month.value;
    const day = event.target.day.value;
    const date = `2017-${month}-${day}`;

    // instance.context.resetValidation();
    if(month === '' || day === ''){
      // console.log("invalid");
      // instance.messageFlags.set(displayErrorMessages, true);

      document.getElementById("dateError").style.visibility = "visible";
    }
    else {
      document.getElementById("dateError").style.visibility = "hidden";
      // instance.messageFlags.set(displayErrorMessages, false);

      Session.set('eventModal', { type: 'add', date: date });
      $('#calendar').modal({ blurring: true }).modal('show');
    }
  },
});
