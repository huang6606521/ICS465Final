import { Events } from '../../api/events/events.js';
import {_} from 'meteor/underscore';

/**
 * A list of Contacts to pre-fill the Collection.
 * @type {*[]}
 */
const eventSeeds = [
  {
    title: 'event1',
    start: '2016-11-17',
    end: '2016-11-18',
    type: 'Corporate',
    guests: 50
  },
];

/**
 * Initialize the Contacts collection if empty with seed data.
 */
if (Events.find().count() === 0) {
  _.each(eventSeeds, function eventContacts(stuff) {
    Events.insert(stuff);
  });
}
