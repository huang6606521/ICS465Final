import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Groups, GroupsSchema } from '../../api/groups/groups.js';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';

Template.Edit_Group_Page.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = GroupsSchema.namedContext('Edit_Group_Page');
});

Template.Edit_Group_Page.helpers({
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
  isLeader(){
    if( Meteor.user().profile.name === Groups.findOne(FlowRouter.getParam('_id')).leader) {
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
  courseSelected(course) {
    const groupData = Groups.findOne(FlowRouter.getParam('_id'));
    return groupData && (groupData.course === course) && true;
  },
  membersList() {
    const groupData = Groups.findOne(FlowRouter.getParam('_id'));
    // See https://dweldon.silvrback.com/guards to understand '&&' in next line.
    return groupData['members'];
  }
});

Template.Edit_Group_Page.onRendered(function enableSemantic() {
  const instance = this;
  instance.$('select.ui.dropdown').dropdown();
  instance.$('.ui.selection.dropdown').dropdown();
  instance.$('ui.fluid.search.dropdown').dropdown();
});

Template.Edit_Group_Page.events({
  'submit .group-data-form'(event, instance) {
    event.preventDefault();
    // console.log(Groups.get('eventModal'));
    // let updatedGroup = Groups.get('eventModal');

    const name = event.target.name.value;
    const description = event.target.description.value;
    const course =  event.target.course.value;
    let leader = Groups.findOne(FlowRouter.getParam('_id')).leader;
    let members = Groups.findOne(FlowRouter.getParam('_id')).members;
    let posts = Groups.findOne(FlowRouter.getParam('_id')).posts;
    let image = 'images/CSLogo1.png';
    if (event.target.image.value != '' ) {
      image = event.target.image.value;
    }

    let updatedGroup = {name, course, description, leader, members, posts, image };
    // Clear out any old validation errors.
    instance.context.resetValidation();
    // Invoke clean so that updatedGroup reflects what will be inserted.
    GroupsSchema.clean(updatedGroup);
    // Determine validity.
    instance.context.validate(updatedGroup);
    if (instance.context.isValid()) {
      const id = Groups.update(FlowRouter.getParam('_id'), { $set: updatedGroup });
      instance.messageFlags.set(displayErrorMessages, false);
      $('.ui.modal.edit-modal')
          .modal('hide')
      ;
    } else {
      console.log("invalid");
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },

  'click .cancel'(event, instance){
    event.preventDefault();
    console.log('cancel');
    $('.ui.modal.edit-modal')
        .modal('hide')
    ;
    FlowRouter.reload();
  },
  'click .delete-group.button'(event, instance) {
    $('.ui.modal.delete-group-modal')
        .modal('show')
        .modal({
          onApprove: function(){
            Groups.remove(FlowRouter.getParam('_id'));
            console.log('Removed group');
            FlowRouter.go('/group-page');
          },
          onDeny: function(){
            console.log('cancel delete');
          }
        })
    ;
  },
  'click .leave-group.button'(event, instance){
    event.preventDefault();
    $('.ui.modal.leave-group-modal')
        .modal('show')
        .modal({
          onApprove: function(){
            Groups.update(
                { _id: FlowRouter.getParam('_id') },
                { $pull: { members: Meteor.user().profile.name }
                });
            FlowRouter.reload();
            console.log('Left group');
            FlowRouter.go('/group-page');
          },
          onDeny: function(){
            console.log('cancel leave');
          }
        })
    ;

  },
});