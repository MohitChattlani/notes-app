import React from 'react';
import {Meteor} from 'meteor/meteor';
import expect from 'expect';
import {mount} from 'enzyme';
import {NoteListHeader} from './NoteListHeader';

if (Meteor.isClient) {
  describe('NoteListHeader',function () {
    it('should call notes.insert method',function () {
      const spy=expect.createSpy();
      const wrapper=mount(<NoteListHeader meteorcall={spy}/>);
      wrapper.find('button').simulate('click');
      expect(spy.calls[0].arguments[0]).toBe('notes.insert');
    });
  });
}
