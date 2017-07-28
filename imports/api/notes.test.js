import expect from 'expect';
import {Meteor} from 'meteor/meteor';
import {Notes} from './notes';

if (Meteor.isServer) {
  describe('notes',function () {
    const noteOne={
      _id:"NoteId1",
      title:"title1",
      body:"body1",
      userId:"userId1",
      updatedAt:0
    };
    const noteTwo={
      _id:"NoteId2",
      title:"title2",
      body:"body2",
      userId:"userId2",
      updatedAt:0
    };
    beforeEach(function(){
      Notes.remove({});
      Notes.insert(noteOne);
      Notes.insert(noteTwo);
    });
    it('should insert new note',function () {
      const userId="testId";
      const _id=Meteor.server.method_handlers['notes.insert'].apply({userId});
      expect(Notes.findOne({_id,userId})).toExist();
    })
    it('should throw error if not authenticated',function(){
      expect(()=>{
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });
    it('should remove a note',function () {
      Meteor.server.method_handlers['notes.remove'].apply({userId:noteOne.userId},[noteOne._id]);
      expect(Notes.findOne({_id:noteOne._id})).toNotExist();
    });
    it('should not remove note if unauthenticated',function () {
      expect(()=>{
        Meteor.server.method_handlers['notes.remove'].apply({},[noteOne._id]);
      }).toThrow();
    });
    it('should not remove note if invalid id',function () {
      expect(()=>{
        Meteor.server.method_handlers['notes.remove'].apply({userId:noteOne.userId});
      }).toThrow();
    });
    it ('should update note',function () {
      const title="Updated title";
      Meteor.server.method_handlers['notes.update'].apply({userId:noteOne.userId},
        [ noteOne._id,
          { title }
      ]);
      const note=Notes.findOne({_id:noteOne._id});
      expect(note.updatedAt).toBeGreaterThan(0);
      expect(note).toInclude({title,body:noteOne.body});
    });
    it('should throw error if extra updates',function () {
      expect(()=>{
        Meteor.server.method_handlers['notes.update'].apply({userId:noteOne.userId},
          [ noteOne._id,
            { name:"Mohit" }
        ]);
      }).toThrow();
    });
    it('should not update if user was not creator',function () {
      const title="Updated title";
      Meteor.server.method_handlers['notes.update'].apply({userId:"userId2"},
        [ noteOne._id,
          { title }
      ]);
      const note=Notes.findOne({_id:noteOne._id});
      expect(note).toInclude(noteOne);
    });
    it('should not update note if unauthenticated',function () {
      expect(()=>{
        Meteor.server.method_handlers['notes.update'].apply({},[
          noteOne._id,
          {title:"updated title"}
        ]);
      }).toThrow();
    });
    it('should not update note if invalid id',function () {
      expect(()=>{
        Meteor.server.method_handlers['notes.update'].apply({userId:noteOne.userId});
      }).toThrow();
    });
    it('should return users notes',function () {
      const res= Meteor.server.publish_handlers.notes.apply({userId:noteOne.userId});
      const note= res.fetch();
      expect(note.length).toBe(1);
      expect(note[0]).toEqual(noteOne);
    });
    it('should return 0 notes for user that has none',function () {
      const res= Meteor.server.publish_handlers.notes.apply({userId:"usernotexist"});
      const note= res.fetch();
      expect(note.length).toBe(0);
    });
  })
}
