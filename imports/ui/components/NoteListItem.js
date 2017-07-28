import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const NoteListItem=(props)=>{
  return (
    <div>
      <h5>{props.note.title? props.note.title:'Untitled'}</h5>
      <p>{moment(props.note.updatedAt).format('DD-M-YYYY')}</p>
    </div>
  );
};

NoteListItem.propTypes={
  note: PropTypes.object.isRequired
};

export default NoteListItem;
