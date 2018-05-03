import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Used for default home page
FlowRouter.route('/', {
  name: 'Public_Landing_Page',
  action() {
    BlazeLayout.render('Landing_Page_Layout', { main: 'Public_Landing_Page' });
  },
});

FlowRouter.route('/calendar-page', {
  name: 'Calendar_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Calendar_Page' });
  },
});

FlowRouter.route('/create-group', {
  name: 'Create_Group_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Create_Group_Page' });
  },
});

FlowRouter.route('/create-review', {
  name: 'Create_Review_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Create_Review_Page' });
  },
});

FlowRouter.route('/group-details/:_id', {
  name: 'Group_Details_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Group_Details_Page' });
  },
});

FlowRouter.route('/group-page', {
  name: 'Group_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Group_Page' });
  },
});

FlowRouter.route('/messages', {
  name: 'Messages_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Messages_Page' });
  },
});

FlowRouter.route('/my-calendar-page', {
  name: 'My_Calendar_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'My_Calendar_Page' });
  },
});

FlowRouter.route('/reports-page', {
  name: 'Reports_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Reports_Page' });
  },
});

FlowRouter.route('/reviews/:_id', {
  name: 'Review_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Review_Page' });
  },
});

FlowRouter.route('/study-session', {
  name: 'Study_Session_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Study_Session_Page' });
  },
});


// FlowRouter.route('/studs-pros-page', {
//   name: 'Studs_Pros_Page',
//   action() {
//     BlazeLayout.render('App_Body', { main: 'Studs_Pros_Page' });
//   },
// });

FlowRouter.route('/study-session-search', {
  name: 'Study_Session_Page_Search',
  action() {
    BlazeLayout.render('App_Body', { main: 'Study_Session_Page_Search' });
  },
});

FlowRouter.route('/study-session/:_id', {
  name: 'Study_Session_Detail_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'Study_Session_Detail_Page' });
  },
});

FlowRouter.route('/user-profile', {
  name: 'User_Profile_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'User_Profile_Page' });
  },
});

FlowRouter.route('/user-profile/:_id', {
  name: 'User_Profile_Detail_Page',
  action() {
    BlazeLayout.render('App_Body', { main: 'User_Profile_Detail_Page' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_Body', { main: 'App_Not_Found' });
  },
};

//Change
FlowRouter.route('/events', {
  name: 'events',
  action() {
    BlazeLayout.render('App_Body', { main: 'events' });
  },
});

FlowRouter.route('/events', {
  name: 'events',
  action() {
    BlazeLayout.render('App_Body', { main: 'events' });
  },
});
