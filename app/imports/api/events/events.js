import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

// Define Events as a new collection.
export const Events = new Mongo.Collection( 'events' );

// Block all database operations on the client-side.
Events.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Events.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});


// Define Schema.
let EventsSchema = new SimpleSchema({
  // "title" is required by fullcalendar.
  // Title of the event.
  'title': {
    type: String,
    label: 'The title of this event.'
  },
  // "start" is required by fullcalendar.
  // Start is the start time of the event.
  'start': {
    type: String,
    label: 'When this event will start.'
  },
  // End is the end time of the event.
  'end': {
    type: String,
    label: 'When this event will end.'
  },
  // Change
  // Allowed event types.
  'type': {
    type: String,
    label: 'What type of event is this?',
    allowedValues: [ 'Birthday', 'Corporate', 'Wedding', 'Miscellaneous' ]
  },
  // Guests attending the event.
  'guests': {
    type: Number,
    label: 'The number of guests expected at this event.'
  }
});

Events.attachSchema( EventsSchema );