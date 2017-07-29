import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import {Notes} from '/imports/api/notes';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';

export class Editor extends React.Component{
  render(){
      if (this.props.note) {
        return (
          <div>
            <p>Note found</p>
          </div>
        );
      }
      else {
        return <p>{this.props.selectedNoteId ? "Note not found.":"Pick or create a new note."}</p>
      }
  }
}
Editor.propTypes={
  selectedNoteId:PropTypes.string,
  note:PropTypes.object
}

export default createContainer(()=>{
  const selectedNoteId= Session.get('selectedNoteId');
  Meteor.subscribe('notes');
  return {
    selectedNoteId,
    note:Notes.findOne({_id:selectedNoteId})
  };
},Editor);
