import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Sessions, SessionsSchema } from '../../api/sessions/sessions.js';
import { Users } from '../../api/users/users.js';

let isPast = (date) => {
  // Get access to today's moment
  let today = moment().format();
  return moment(today).isAfter(date);
};

// Subscribe to the "events" collection.
Template.Calendar_Page.onCreated(() => {
  let template = Template.instance();
  template.subscribe('Sessions');
  template.subscribe('Users');
});

Template.Calendar_Page.onRendered(() => {
  // Initialize the calendar.
  $('#sessions-calendar').fullCalendar({
    header: {
      left:   'title',
      center: '',
      right:  'today prev,next'
    },

    // Add events to the calendar.
    events(start, end, timezone, callback) {
      let data = Sessions.find().fetch().map((session) => {
        // Don't allow already past study sessions to be editable.
        session.editable = !isPast(session.start);
        return session;
      });

      if (data) {
        callback(data);
      }
    },

    eventRender(session, element) {
      element.find('.fc-content').html(
          `<h4 class="calendar-course">${ session.course }</h4>
         <p class="calendar-topic">${ session.topic }</p>
        `
      );
    },

    /* Implement error messages with alerts. */
    // // Drag and drop events.
    // eventDrop(session, delta, revert) {
    //   let date = session.start.format();
    //   if (!isPast(date)) {
    //     let update = {
    //       _id: session._id,
    //       start: date,
    //       end: date
    //     };
    //
    //     Meteor.call('editEvent', update, (error) => {
    //       if (error) {
    //         Bert.alert(error.reason, 'danger');
    //       }
    //     });
    //   } else {
    //     revert();
    //     Bert.alert('Sorry, you can\'t move items to the past!', 'danger');
    //   }
    // },

    // Allow events to be dragged and dropped.
    eventDrop(session, delta, revert) {
      let date = session.start.format();

      if (moment(date).isSameOrAfter(moment(), 'day')) {
        let update = {
          _id: session._id,
          start: date,
          end: date
        };

        // Update the date of the event.
        Meteor.call('editEvent', update);
      } else {
        revert();
      }
    },

    // Modal to add event when clicking on a day.
    dayClick(date, session) {
      Session.set('eventModal', { type: 'add', date: date.format() });
      // Check if the date has already passed.
      if(moment(date.format()).isSameOrAfter(moment(), 'day')) {
        $('#create-study-session-modal').modal({ blurring: true }).modal('show');
      }
    },

    // Directs to study session detail page.
    eventClick(event) {
      Session.set('eventModal', { type: 'edit', event: event._id });
      FlowRouter.go('Study_Session_Detail_Page', { _id: event._id });
    }
  });

  // Updates the calendar if there are changes.
  Tracker.autorun(() => {
    Sessions.find().fetch();
    $('#sessions-calendar').fullCalendar('refetchEvents');
  });
});

Template.Calendar_Page.helpers({
  hasTutorial(){
    return Users.findOne({ username: Meteor.user().profile.name }).tutorial;
  }
});