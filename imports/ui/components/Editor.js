import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import {Notes} from '/imports/api/notes';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';

export class Editor extends React.Component{
  handleBodyChange(e)
  {
    this.props.call('notes.update',this.props.note._id,{
      body:e.target.value
    });
  }
  handleTitleChange(e){
    this.props.call('notes.update',this.props.note._id,{
      title:e.target.value
    });
  }
  render(){
      if (this.props.note) {
        return (
          <div>
            <input placeholder="Untitled" value={this.props.note.title} onChange={this.handleTitleChange.bind(this)}/>
            <textarea placeholder="Your note here" value={this.props.note.body} onChange={this.handleBodyChange.bind(this)}/>
            <button>Delete note</button>
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
    note:Notes.findOne({_id:selectedNoteId}),
    call:Meteor.call
  };
},Editor);
