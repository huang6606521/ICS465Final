import {Template} from 'meteor/templating';
import {Users, UsersSchema} from '../../api/users/users.js';
import {Groups, GroupsSchema} from '../../api/groups/groups.js';
import {_} from 'meteor/underscore';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict';

const displayErrorMessages = 'displayErrorMessages';

Template.Add_Member_Modal.onCreated(function onCreated() {
  let template = Template.instance().subscribe('Users').ready();
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = GroupsSchema.namedContext('Add_Member_Modal');
})

Template.Add_Member_Modal.onRendered(function enableSemantic() {
  const template = this;
  template.$('.message .close')
      .on('click', function () {
        $(this)
            .closest('.message')
            .transition('fade')
        ;
      });
});
Template.Add_Member_Modal.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayErrorMessage(){
    return Template.instance().messageFlags.get(displayErrorMessages);
  },
  displayFieldError(fieldName) {
    const errorKeys = Template.instance().context.invalidKeys();
    return _.find(errorKeys, (keyObj) => keyObj.name === fieldName);
  },
  usersList() {
    console.log(Users.find());
    return Users.find();
  },
});

Template.Add_Member_Modal.events({
  'submit .add-member-form'(event, instance) {
    event.preventDefault();

    const groupData = Groups.findOne(FlowRouter.getParam('_id'));

    //update the member values
    const newMember = event.target.member.value;

    //determine if user exists
    let userExists = true;
    let val = Users.findOne({username: newMember});
    if (val == undefined) {
      console.log('user doesnt exist');
      userExists = false;
    }
    else {
      console.log('user exists');
    }

    //determine if user is already in the group
    let alreadyIn = false;
    let search = _.find(groupData['members'], function (user) {
      return user == newMember;
    })
    if (search != undefined) {
      console.log('User is already in group.');
      alreadyIn = true;
    }

    if (userExists && !alreadyIn) {
      //Add the new member
      const id = Groups.update(FlowRouter.getParam('_id'), { $push: { members: newMember } });
      console.log('Added ' + newMember);

      //Send a notification

      //Make sure to turn off display errors and then hide the modal.
      //TRY: Creating a success message so we can keep adding new people.
      instance.messageFlags.set(displayErrorMessages, false);
      $('.ui.modal.add-member-modal')
          .modal('hide')
      ;
    } else {
      console.log("invalid");
      instance.messageFlags.set(displayErrorMessages, true);

    }
  },

  'click .exit'(event, instance){
    event.preventDefault();
    console.log('exit');
    $('.ui.modal.add-member-modal')
        .modal('hide')
    ;

  },

});