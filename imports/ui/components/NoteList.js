import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Notes} from '/imports/api/notes';
import PropTypes from 'prop-types';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';
import {Session} from 'meteor/session';

export class NoteList extends React.Component {
  constructor(props){
    super(props);
    this.state={
      query: ""
    };
  }
  changeQuery(e){
    this.setState({
      query:e.target.value
    });
  }
  renderNotes() {
    if (this.props.notes.length===0) {
      return <NoteListEmptyItem/>;
    }
    else {
      let input=this.refs.input.value;
      let re = new RegExp(`${input}`, 'i');
      let undef_notes=0;
      let mod_notes=this.props.notes.map((note)=>{
        if (re.test(note.title)) {
          return note;
        }
        else {
          undef_notes++;
        }
      });
      if (undef_notes===mod_notes.length) {
        return <p className="empty-item">Sorry, no note found.</p>;
      }
      return mod_notes.map((note)=>{
          if (note) {
            return <NoteListItem key={note._id} note={note}/>;
          }
      });
    }
  }
  render(){
    return (
      <div className="item-list">
        <div className="item-list__header">
          <NoteListHeader/>
          <input placeholder="Search notes" ref="input" type="text" value={this.state.query} onChange={this.changeQuery.bind(this)} />
        </div>
        {this.renderNotes()}
      </div>
    );
  }
}
NoteList.propTypes={
  notes: PropTypes.array.isRequired
};

export default createContainer(()=>{
  const selectedNoteId=Session.get('selectedNoteId');
  Meteor.subscribe('notes');
  return {
    notes: Notes.find({},{sort:{updatedAt:-1}}).fetch().map((note)=>{
      let selected=false;
      if (note._id===selectedNoteId) {
        selected=true;
      }
      return {
        ...note,
        selected
      };
    })
  };
},NoteList);
