import { Sessions } from '../../api/sessions/sessions.js';
import { Reviews } from '../../api/reviews/reviews.js';
import { Messages } from '../../api/messages/messages.js';
import { Groups } from '../../api/groups/groups.js';
import { Users } from '../../api/users/users.js';
// Change
import { Events } from '../../api/events/events.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('Sessions', function publishSessionsData() {
  return Sessions.find();
});

Meteor.publish('Reviews', function publishReviewsData() {
  return Reviews.find();
});

Meteor.publish('Groups', function publishGroupsData() {
  return Groups.find();
});

Meteor.publish('Messages', function publishMessagesData() {
  return Messages.find();
});
//Change
// Publish "events".
Meteor.publish( 'events', function() { return Events.find(); } );

Meteor.publish('Users', function() {
  return Users.find();
})