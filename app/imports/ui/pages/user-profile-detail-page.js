import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { _ } from 'meteor/underscore';
import { Reviews } from '../../api/reviews/reviews.js';
import { Users } from '../../api/users/users.js';


Template.User_Profile_Detail_Page.onRendered(function enableSemantic() {
});

Template.User_Profile_Detail_Page.onCreated(function onCreated() {
  this.autorun(() => {
    this.subscribe('Reviews').ready();
    this.subscribe('Users').ready();
  });
});

Template.User_Profile_Detail_Page.helpers({
  reviewsList() {
    return Reviews.find();
  },
  getAverageRate() {
    let username = Users.findOne(({ _id: FlowRouter.getParam('_id') })).username;
    let allReviews = Reviews.findOne({ forUser: username }).userReviews;

    let totalRate = 0;
    let size = 0;
    let averageRate = 0;
    allReviews.forEach(function (review) {
      totalRate = totalRate + review.rating;
      size++;
    });
    averageRate = parseInt(Math.floor(totalRate / size));
    return averageRate;
  },
  getUserName() {
    // return Meteor.user() ? Meteor.user().profile.name : 'No logged in user';
    let profileCursor = Users.findOne({ _id: FlowRouter.getParam('_id') });
    return `${profileCursor.firstname} ${profileCursor.lastname}`;
  },
  getUser() {
    return Users.findOne({ _id: FlowRouter.getParam('_id') });
  },
  hasTutorial(){
    return Users.findOne({ username: Meteor.user().profile.name }).tutorial;
  },
  prosList () {
    return Users.findOne({ _id: FlowRouter.getParam('_id') }).pros;
  },
  getUserReview(){
    let username = Users.findOne(({ _id: FlowRouter.getParam('_id') })).username;
    return Reviews.findOne({forUser: username});
  },
  getCourseTitle (course) {
      switch(course) {
        case "ICS 111":
          return "Introduction to Computer Science I";
        case "ICS 141":
          return "Discrete Mathematics for Computer Science I";
        case "ICS 211":
          return "Introduction to Computer Science II";
        case "ICS 241":
          return "Discrete Mathematics for Computer Science II";
        case "ICS 314":
          return "Software Engineering I";
        case "MATH 241":
          return "Calculus I";
        case "MATH 242":
          return "Calculus II";
        case "MATH 371":
          return "Elementary Probability Theory";
      }
    },
    getProfLevelColor(level){
      switch(level){
        case "low":
          return "red";
        case "medium":
          return "yellow";
        case "high":
          return "green";
      }
    },
    studsList () {
      let stud = Users.findOne({ username: Meteor.user().profile.name }).studs;
      stud = _.sortBy(stud, function(classProf){ return classProf.course;});
      return stud;
    },
    userExists() {
        let username = Users.findOne(({ _id: FlowRouter.getParam('_id') })).username;
        if(username === undefined) {
            return false;
        } else {
            return true;
        }
    },
});

Template.User_Profile_Detail_Page.events({
// nothing
});
