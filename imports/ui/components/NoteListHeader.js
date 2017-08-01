import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import {Session} from 'meteor/session';

export const NoteListHeader=(props)=>{
  return (
    <div className="item-list__header">
      <button className="button" onClick={()=>{
        props.meteorcall('notes.insert',(err,res)=>{
          if (res) {
            props.Session.set('selectedNoteId',res);
          }
        });
      }}>Create Note</button>
    </div>
  );
};

NoteListHeader.propTypes={
  meteorcall:PropTypes.func.isRequired,
  Session:PropTypes.object.isRequired
};
export default createContainer(()=>{
  return {
    meteorcall:Meteor.call,
    Session
  };
},NoteListHeader);
