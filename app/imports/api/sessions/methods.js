import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Sessions, SessionsSchema } from './sessions';

Meteor.methods({
  // addEvent( event ) {
  //   check( event, {
  //     title: String,
  //     start: String,
  //     end: String,
  //     type: String,
  //     guests: Number
  //   });
  //
  //   try {
  //     return Events.insert( event );
  //   } catch ( exception ) {
  //     throw new Meteor.Error( '500', `${ exception }` );
  //   }
  // },

  editEvent( event ) {
    check( event, {
      _id: String,
      start: String,
      end: String,
    });

    try {
      return Sessions.update( event._id, {
        $set: event
      });
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  },
  removeEvent( event ) {
    check( event, String );

    try {
      return Events.remove( event );
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }
});
