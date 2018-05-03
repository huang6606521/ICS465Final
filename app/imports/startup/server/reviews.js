import { Reviews } from '../../api/reviews/reviews.js';
import { _ } from 'meteor/underscore';

/**
 * A list of Reviews to pre-fill the Collection.
 * @type {*[]}
 */
const reviewSeeds = [];

/**
 * Initialize the Stuff collection if empty with seed data.
 */
if (Reviews.find().count() === 0) {
  _.each(reviewSeeds, function seedReviews(reviews) {
    Reviews.insert(reviews);
  });
}
