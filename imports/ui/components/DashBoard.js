import {Meteor} from 'meteor/meteor';
import React from 'react';
import PrivateHeader from './PrivateHeader';
import {History} from '/imports/routes/routes';
import NoteList from './NoteList.js';
import {Session} from 'meteor/session';
import Editor from './Editor';
export default class DashBoard extends React.Component{
  componentWillMount(){
    if (!Meteor.userId())
    {
      History.replace('/');
    }
    else {
      Session.set('selectedNoteId',this.props.location.pathname.slice(11));
    }
  }
  componentWillUpdate(){
    if (!Meteor.userId())
    {
      History.replace('/');
    }
  }
  componentWillUnmount()
  {
    Session.set('selectedNoteId',undefined);
  }
  render(){
    return (
      <div>
        <PrivateHeader title="Dashboard"/>
        <div className="page-content">
          <div className="page-content__sidebar">
            <NoteList/>
          </div>
          <div className="page-content__main">
            <Editor/>
          </div>
        </div>
      </div>
    );
  }
}
