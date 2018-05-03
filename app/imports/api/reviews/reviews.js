import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

/* eslint-disable object-shorthand */

export const Reviews = new Mongo.Collection('Reviews');

/**
 * Create the schema for Reviews
 */
export const ReviewsSchema = new SimpleSchema({
  forUser: {
    label: 'forUser',
    type: String,
    optional: false,
  },
  userReviews: {
    label: 'userReviews',
    type: [Object],
    blackbox: true,
  },
});

Reviews.attachSchema(ReviewsSchema);
