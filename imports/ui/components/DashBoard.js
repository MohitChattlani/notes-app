import {Meteor} from 'meteor/meteor';
import React from 'react';
import PrivateHeader from './PrivateHeader';
import {History} from '/imports/routes/routes';
import NoteList from './NoteList.js';
import {Session} from 'meteor/session';

export default class DashBoard extends React.Component{
  componentWillMount(nextState){
    if (!Meteor.userId())
    {
      History.replace('/');
    }
    else {
      Session.set('selectedNoteId',this.props.location.pathname.slice(11));
    }
  }
  render(){
    return (
      <div>
        <PrivateHeader title="Dashboard"/>
        <div className="page-content">
          <NoteList/>
        </div>
      </div>
    );
  }
}
