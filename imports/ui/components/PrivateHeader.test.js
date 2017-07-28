import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';
import {PrivateHeader} from './PrivateHeader';

if (Meteor.isClient) {
  describe('PrivateHeader',function () {
    it('should set button text to logout',function () {
      const wrapper=mount(<PrivateHeader title="My title" handlelogout={()=>{}}/>);
      const buttontext=wrapper.find('button').text();
      expect(buttontext).toBe('Logout');
    });
    it('should use title prop as h1 text',function () {
      const title="my title";
      const wrapper=mount(<PrivateHeader title={title} handlelogout={()=>{}}/>);
      const heading=wrapper.find('h1').text();
      expect(heading).toBe(title);
    });
    /*
    it('should run the function',function () {
      const spy=expect.createSpy();
      spy(1,2);
      spy('mohit');
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('mohit');
    });
    */
    it('should call the function on button click',function () {
      const spy=expect.createSpy();
      const wrapper=mount(<PrivateHeader title="My title" handlelogout={spy}/>);
      wrapper.find('button').simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });
}
