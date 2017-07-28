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
    History.replace(`/dashboard/${noteid}`);
  }
});

Meteor.startup(()=>{
  Session.set('selectedNoteId',undefined);
  ReactDOM.render(routes,document.getElementById('app'));
});
