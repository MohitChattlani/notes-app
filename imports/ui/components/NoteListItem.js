import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Session} from 'meteor/session';
import {createContainer} from 'meteor/react-meteor-data';

export const NoteListItem=(props)=>{
  return (
    <div onClick={()=>{
      props.Session.set('selectedNoteId',props.note._id);
    }}>
      <h5>{props.note.title? props.note.title:'Untitled'}</h5>
      <p>{moment(props.note.updatedAt).format('DD-M-YYYY')}</p>
    </div>
  );
};

NoteListItem.propTypes={
  note: PropTypes.object.isRequired,
  Session:PropTypes.object.isRequired
};

export default createContainer(()=>{
  return {
    Session
  };
},NoteListItem)
