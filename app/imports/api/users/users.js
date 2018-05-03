import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Users = new Mongo.Collection('Users');

// // Block all database operations on the client-side.
// Users.allow({
//   insert: () => false,
//   update: () => false,
//   remove: () => false
// });
//
// Users.deny({
//   insert: () => true,
//   update: () => true,
//   remove: () => true
// });

/**
 * Create the schema for Sessions
 */
export const UsersSchema = new SimpleSchema({
  //
  firstname: {
    label: 'First Name',
    type: String,
    optional: false,
  },
  lastname: {
    label: 'Last Name',
    type: String,
    optional: false,
  },
  username: {
    label: 'Username',
    type: String,
    optional: false,
  },
  profilePicture: {
    label: 'Profile Picture',
    type: String,
    optional: true,
  },
  pros: {
    label: 'Pros',
    type: [Object],
    optional: true,
    blackbox: true,
  },
  studs: {
    label: 'Studs',
    type: [Object],
    optional: true,
    blackbox: true,
  },
  terms: {
    label:'Terms of Use',
    type: Boolean,
    optional: false,
    custom: function checked() {
      if (this.value) {
        return this.value;
      } else {
        return "0";
      }
    }
  },
  admin: {
    label: 'Admin Permission',
    type: Boolean,
    optional: false,
  },
  tutorial: {
    label: 'Tutorial',
    type: Boolean,
    optional: false,
  },
  interests: {
    label: 'Interests',
    type: String,
    optional: true,
  }
});

Users.attachSchema(UsersSchema);