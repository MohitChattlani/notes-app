import {Meteor} from 'meteor/meteor';
import ReactDOM from 'react-dom';
import {Tracker} from 'meteor/tracker';
import {routes,onAuthChange} from './../imports/routes/routes';
import '../imports/startup/simple-schema-configuration';
import {Session} from 'meteor/session';
import {History} from '../imports/routes/routes';

Tracker.autorun(()=>{
  const isAuthenticated= !!Meteor.userId();
  onAuthChange(isAuthenticated);
});

Tracker.autorun(()=>{
  const noteid= Session.get('selectedNoteId');
  if (noteid) {
    Session.set('isNavOpen',false);
    History.replace(`/dashboard/${noteid}`);
  }
});

Tracker.autorun(()=>{
  const isNavOpen=Session.get('isNavOpen');
  document.body.classList.toggle('is-nav-open',isNavOpen);
});

Tracker.autorun(()=>{
  const confirmDelete=Session.get('confirmDelete');
  document.body.classList.toggle('confirm-delete',confirmDelete);
});

Meteor.startup(()=>{
  Session.set('selectedNoteId',undefined);
  Session.set('isNavOpen',false);
  Session.set('confirmDelete',false);
  ReactDOM.render(routes,document.getElementById('app'));
});
