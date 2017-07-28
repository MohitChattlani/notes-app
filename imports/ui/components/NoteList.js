import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Notes} from '/imports/api/notes';
import PropTypes from 'prop-types';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

const renderNotes=(notes)=> {
  if (notes.length===0) {
    return <NoteListEmptyItem/>;
  }
  else {
    return notes.map((note)=>{
      return <NoteListItem key={note._id} note={note}/>;
    });
  }
};

export const NoteList=(props)=>{
  return (
    <div>
      <NoteListHeader/>
      <p>NoteList {props.notes.length}</p>
      {renderNotes(props.notes)}
    </div>
  );
};
NoteList.propTypes={
  notes: PropTypes.array.isRequired
};

export default createContainer(()=>{
  Meteor.subscribe('notes');
  return {
    notes: Notes.find().fetch()
  };
},NoteList);
