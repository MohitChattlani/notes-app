import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import {Session} from 'meteor/session';

export class NoteListHeader extends React.Component{
  render(){
    return (
        <button className="button button--space" onClick={()=>{
          this.props.meteorcall('notes.insert',(err,res)=>{
            if (res) {
              this.props.Session.set('selectedNoteId',res);
            }
          });
        }}>Create Note</button>
    );
  }
}

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
