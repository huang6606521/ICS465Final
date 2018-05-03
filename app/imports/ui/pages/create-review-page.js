import {Template} from 'meteor/templating';
import {ReactiveDict} from 'meteor/reactive-dict';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {_} from 'meteor/underscore';
import {Reviews, ReviewsSchema} from '../../api/reviews/reviews.js';

/* eslint-disable no-param-reassign */

const displayErrorMessages = 'displayErrorMessages';
let ratingError = false;
let titleError = false;
let reviewError = false;

Template.Create_Review_Page.onCreated(function onCreated() {
  this.messageFlags = new ReactiveDict();
  this.messageFlags.set(displayErrorMessages, false);
  this.context = ReviewsSchema.namedContext('Create_Review_Page');
});

Template.Create_Review_Page.helpers({
  errorClass() {
    return Template.instance().messageFlags.get(displayErrorMessages) ? 'error' : '';
  },
  displayFieldError(fieldName) {
    switch(fieldName) {
      case 'rating': if(ratingError === false){return true;} else {return false;};break;
      case 'title': if(titleError === false){return true;} else {return false;}; break;
      case 'review': if(reviewError === false){return true;} else {return false;}; break;
      default: return false;
    }
  },
});

Template.Create_Review_Page.onRendered(function enableSemantic() {
  const instance = this;
  instance.$('.ui.enable.rating').rating({
    onRate: function (value) {
      const rate = value;
      return rate;
    }
  }
  );
});

Template.Create_Review_Page.events({
  'submit .review-data-form'(event, instance) {
    event.preventDefault();

    //Resets all old validation errors
    ratingError = false;
    titleError = false;
    reviewError = false;

    const rating = $('.ui.enable.rating').rating('get rating');
    const title = event.target.title.value;
    const review = event.target.review.value;
    const checked = 0;

    const newReview = {'rating': rating, 'title': title, 'review': review, 'checked': checked };
    console.log('New Review');
    console.log(newReview);

    //check validity
    if (rating === 0) {ratingError = true;}
    if (title === "") {titleError = true;}
    if (review === "") {reviewError = true;}

    if (titleError === false && reviewError === false ){
      Reviews.update(
          { _id: FlowRouter.getParam('_id') },
          { $push: { userReviews: newReview } });
      instance.messageFlags.set(displayErrorMessages, false);
      $('.ui.modal.create-review-modal')
          .modal('hide')
      ;
      event.target.reset();
    } else {
      instance.messageFlags.set(displayErrorMessages, true);
    }
  },
});

