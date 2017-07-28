import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {NoteListItem} from './NoteListItem';
import {Meteor} from 'meteor/meteor';
import {notes} from '/imports/fixtures/fixtures';

if (Meteor.isClient) {
  describe('NoteListItem',function () {
    let Session;
    beforeEach(()=>{
      Session={
        set:expect.createSpy()
      };
    });
    it('should render title and timestamp',function () {
      const wrapper=mount(<NoteListItem note={notes[0]} Session={Session}/>);
      expect(wrapper.find('h5').text()).toBe(notes[0].title);
      expect(wrapper.find('p').text()).toBe('28-7-2017');
    });
    it('should render Untitled for empty title',function () {
      const wrapper=mount(<NoteListItem note={notes[1]} Session={Session}/>);
      expect(wrapper.find('h5').text()).toBe('Untitled');
      expect(wrapper.find('p').text()).toBe('28-7-2017');
    });
    it('should call set on click',function () {
      const wrapper=mount(<NoteListItem note={notes[1]} Session={Session}/>);
      wrapper.find('div').simulate('click');
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId',notes[1]._id);
    });
  });
}
