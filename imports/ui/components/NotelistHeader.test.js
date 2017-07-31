import React from 'react';
import {Meteor} from 'meteor/meteor';
import expect from 'expect';
import {mount} from 'enzyme';
import {NoteListHeader} from './NoteListHeader';
import {notes} from '/imports/fixtures/fixtures';

if (Meteor.isClient) {
  describe('NoteListHeader',function () {
    let meteorcall;
    let Session;
    beforeEach(function () {
      meteorcall=expect.createSpy();
      Session={
        set:expect.createSpy()
      };
    });
    it('should call notes.insert method',function () {
      const wrapper=mount(<NoteListHeader meteorcall={meteorcall} Session={Session}/>);
      wrapper.find('button').simulate('click');
      meteorcall.calls[0].arguments[1](undefined,notes[0]._id);
      expect(meteorcall.calls[0].arguments[0]).toBe('notes.insert');
      expect(Session.set).toHaveBeenCalledWith('selectedNoteId',notes[0]._id);
    });
    it('should not set session for failed insert',function () {
      const wrapper=mount(<NoteListHeader meteorcall={meteorcall} Session={Session}/>);
      wrapper.find('button').simulate('click');
      meteorcall.calls[0].arguments[1]('error');
      expect(meteorcall.calls[0].arguments[0]).toBe('notes.insert');
      expect(Session.set).toNotHaveBeenCalled();
    });
  });
}
