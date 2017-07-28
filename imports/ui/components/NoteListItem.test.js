import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import NoteListItem from './NoteListItem';
import {Meteor} from 'meteor/meteor';

if (Meteor.isClient) {
  describe('NoteListItem',function () {
    it('should render title and timestamp',function () {
      const title="My title";
      const updatedAt=1501236412198;
      const wrapper=mount(<NoteListItem note={{title,updatedAt}}/>);
      expect(wrapper.find('h5').text()).toBe(title);
      expect(wrapper.find('p').text()).toBe('28-7-2017');
    });
    it('should render Untitled for empty title',function () {
      const title="";
      const updatedAt=1501236412198;
      const wrapper=mount(<NoteListItem note={{title,updatedAt}}/>);
      expect(wrapper.find('h5').text()).toBe('Untitled');
      expect(wrapper.find('p').text()).toBe('28-7-2017');
    });
  });
}
