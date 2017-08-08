import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import {Notes} from '/imports/api/notes';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import {History} from '/imports/routes/routes';
import Modal from 'react-modal';

export class Editor extends React.Component{
  constructor(props){
    super(props);
    this.state={
      title:'',
      body:'',
      isOpen:false
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
  confirmRemoveNote(){
    Session.set('confirmDelete',true);
    this.setState({
      isOpen:true
    });
  }
  cancelDelete(){
    Session.set('confirmDelete',false);
    this.setState({
      isOpen:false
    });
  }
  confirmDelete(){
    this.props.call('notes.remove',this.props.note._id);
    Session.set('selectedNoteId',undefined);
    this.props.History.push('/dashboard');
    this.cancelDelete();
  }
  render(){
      if (this.props.note) {
        return (
          <div className="editor">
            <input className="editor__title" placeholder="Untitled" value={this.state.title} onChange={this.handleTitleChange.bind(this)}/>
            <textarea className="editor__body" placeholder="Your note here" value={this.state.body} onChange={this.handleBodyChange.bind(this)}/>
            <div>
              <button className="button button--secondary" onClick={this.confirmRemoveNote.bind(this)}>Delete note</button>
            </div>
            <Modal
              isOpen={this.state.isOpen}
              className="boxed-view__box"
              contentLabel="Confirm Delete"
              onRequestClose={this.cancelDelete.bind(this)}
              overlayClassName="boxed-view boxed-view--modal"
              >
                <div className="boxed-view__form">
                  <button className="button button--space" onClick={this.confirmDelete.bind(this)}>Confirm</button>
                  <button className="button button--secondary" onClick={this.cancelDelete.bind(this)}>Cancel</button>
                </div>
              </Modal>
          </div>
        );
      }
      else {
        return (
          <div className="editor">
            <p className="editor__message">{this.props.selectedNoteId ? "Note not found.":"Pick or create a new note."}</p>
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
