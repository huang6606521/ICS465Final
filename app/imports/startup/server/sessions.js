// import { Sessions } from '../../api/sessions/sessions.js';
// import { _ } from 'meteor/underscore';
//
// /**
//  * A list of Sessions to pre-fill the Collection.
//  * @type {*[]}
//  */
// const sessionsSeeds = [
//   {
//     title: 'event1',
//     name: 'Chad',
//     guests: 50,
//     course: 'ICS 315',
//     topic: 'git',
//     start: '2016-11-21',
//     end: '2016-11-22',
//     startV: 1,
//     endV: 2,
//   },
// ];
//
// /**
//  * Initialize the Sessions collection if empty with seed data.
//  */
// if (Sessions.find().count() === 0) {
//   _.each(sessionsSeeds, function seedSessions(sessions) {
//     Sessions.insert(sessions);
//   });
// }
