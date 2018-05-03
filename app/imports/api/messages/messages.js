import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Messages = new Mongo.Collection('Messages');

/**
 * Create the schema for Messages
 */
export const MessagesSchema = new SimpleSchema({
  user: {
    label: 'user',
    type: String,
    optional: false,
    max: 200,
  },
  message: {
    label: 'message',
    type: String,
    optional: false,
    max: 4000,
  },
  time: {
    label: 'time',
    type: String,
  },
});

Messages.attachSchema(MessagesSchema);
