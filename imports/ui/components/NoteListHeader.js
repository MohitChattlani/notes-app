import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';

export const NoteListHeader=(props)=>{
  return (
    <div>
      <button onClick={()=>props.meteorcall('notes.insert')}>Create Note</button>
    </div>
  );
};

NoteListHeader.propTypes={
  meteorcall:PropTypes.func.isRequired
};
export default createContainer(()=>{
  return {
    meteorcall:Meteor.call
  };
},NoteListHeader);
