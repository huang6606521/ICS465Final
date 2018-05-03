import {Groups} from '../../api/groups/groups.js';
import {_} from 'meteor/underscore';

/**
 * A list of Groups to pre-fill the Collection.
 * @type {*[]}
 */
const groupsSeeds = [];

/**
 * Initialize the Stuff collection if empty with seed data.
 */
if (Groups.find().count() === 0) {
  _.each(groupsSeeds, function seedGroups(groups) {
    Groups.insert(groups);
  });
}
