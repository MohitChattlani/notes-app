import React from 'react';
import {Meteor} from 'meteor/meteor';
import expect from 'expect';
import {mount} from 'enzyme';
import  {Editor} from './Editor';
import {notes} from '/imports/fixtures/fixtures';
//Note for testing with Mocha framework. Replace browswerHistory with memoryHistory.

if (Meteor.isClient) {
  describe('Editor',function () {
    let History;
    let call;
    beforeEach(function () {
      call=expect.createSpy();
      History={
        push:expect.createSpy()
      };
    });
    it('should render pick note message',function () {
      const wrapper =mount(<Editor call={call} History={History}/>);
      const message=wrapper.find('p').text();
      expect(message).toBe('Pick or create a new note.');
    });
    it('should render Note not found message',function () {
      const wrapper =mount(<Editor call={call} selectedNoteId="abc" History={History}/>);
      const message=wrapper.find('p').text();
      expect(message).toBe('Note not found.');
    });
    it('should remove note',function () {
      const wrapper =mount(<Editor call={call} selectedNoteId={notes[0]._id} History={History} note={notes[0]}/>);
      wrapper.find('button').simulate('click');
      expect(call.calls[0].arguments[0]).toBe('notes.remove');
      expect(call.calls[0].arguments[1]).toBe(notes[0]._id);
      expect(History.push.calls[0].arguments[0]).toBe('/dashboard');
    });
    it('should update the note body on textarea change',function () {
      const Body="New Body here.";
      const wrapper =mount(<Editor call={call} selectedNoteId={notes[0]._id} History={History} note={notes[0]}/>);
      wrapper.find('textarea').simulate('change',{
        target:{
          value:Body
        }
      });
      expect(wrapper.state('body')).toBe(Body);
      expect(call).toHaveBeenCalledWith('notes.update',notes[0]._id,{body:Body});
    });
    it('should update the note title on input change',function () {
      const title="New title here.";
      const wrapper =mount(<Editor call={call} selectedNoteId={notes[0]._id} History={History} note={notes[0]}/>);
      wrapper.find('input').simulate('change',{
        target:{
          value:title
        }
      });
      expect(wrapper.state('title')).toBe(title);
      expect(call).toHaveBeenCalledWith('notes.update',notes[0]._id,{title});
    });
    it('should set state for new note',function () {
      const wrapper =mount(<Editor call={call} History={History}/>);
      wrapper.setProps({
        selectedNoteId:notes[0]._id,
        note:notes[0]
      });
      expect(wrapper.state('body')).toBe(notes[0].body);
      expect(wrapper.state('title')).toBe(notes[0].title);
    });
    it('should not set state if note prop not provided',function () {
      const wrapper =mount(<Editor call={call} History={History}/>);
      wrapper.setProps({
        selectedNoteId:notes[0]._id
      });
      expect(wrapper.state('body')).toBe('');
      expect(wrapper.state('title')).toBe('');
    });
  });
}
