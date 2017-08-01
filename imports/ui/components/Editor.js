import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import {Notes} from '/imports/api/notes';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import {History} from '/imports/routes/routes';

export class Editor extends React.Component{
  constructor(props){
    super(props);
    this.state={
      title:'',
      body:''
    };
  }
  handleBodyChange(e)
  {
    const body=e.target.value;
    this.setState({
      body
    });
    this.props.call('notes.update',this.props.note._id,{ body });
  }
  handleTitleChange(e){
    const title=e.target.value;
    this.setState({
      title
    });
    this.props.call('notes.update',this.props.note._id,{ title });
  }
  removeNote(){
    this.props.call('notes.remove',this.props.note._id);
    Session.set('selectedNoteId',undefined);
    this.props.History.push('/dashboard');
  }
  componentDidUpdate(prevProps,prevState){
    currentNoteId=this.props.note ? this.props.note._id : undefined;
    prevNoteId=prevProps.note ? prevProps.note._id : undefined;
    if (currentNoteId && currentNoteId !==prevNoteId) {
      this.setState({
        title:this.props.note.title,
        body:this.props.note.body
      })
    }
  }
  render(){
      if (this.props.note) {
        return (
          <div className="Editor">
            <input placeholder="Untitled" value={this.state.title} onChange={this.handleTitleChange.bind(this)}/>
            <textarea placeholder="Your note here" value={this.state.body} onChange={this.handleBodyChange.bind(this)}/>
            <button onClick={this.removeNote.bind(this)}>Delete note</button>
          </div>
        );
      }
      else {
        return (
          <div className="Editor">
            <p>{this.props.selectedNoteId ? "Note not found.":"Pick or create a new note."}</p>
          </div>
        );
      }
  }
}
Editor.propTypes={
  selectedNoteId:PropTypes.string,
  note:PropTypes.object,
  call:PropTypes.func.isRequired,
  History:PropTypes.object.isRequired
}

export default createContainer(()=>{
  const selectedNoteId= Session.get('selectedNoteId');
  Meteor.subscribe('notes');
  return {
    selectedNoteId,
    note:Notes.findOne({_id:selectedNoteId}),
    call:Meteor.call,
    History
  };
},Editor);
