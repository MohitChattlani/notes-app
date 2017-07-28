import {Meteor} from 'meteor/meteor';
import React from 'react';
import PrivateHeader from './PrivateHeader';
import {History} from '/imports/routes/routes';
import NoteList from './NoteList.js';

export default class DashBoard extends React.Component{
  componentWillMount(){
    if (!Meteor.userId())
    {
      History.replace('/');
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
