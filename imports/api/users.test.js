import {Meteor} from 'meteor/meteor';
import expect from 'expect';
import {validateNewUser} from './users';


if (Meteor.isServer) {
  describe('users',function () {
    it('should allow valid emails',function(){
      const res=validateNewUser({
        emails:[
          {
            address:"abc@name.com"
          }
        ]
      });
      expect(res).toBe(true);
    });
    it('should reject invalid email',function () {
      const testuser={
        emails:[
          {
            address:"abcnamecom"
          }
        ]
      };
      expect(()=>{
        validateNewUser(testuser);
      }).toThrow();
    });
  });
}

/*
const add=(a,b)=>{
  if (typeof b !=='number') {
    return a+a;
  }
  return a+b;
};

const sq=(a)=>a*a;

describe('add',function(){
  it('should add 2 nos.',function () {
    const res=add(8,12);
    expect(res).toBe(20);
  });
  it('should double the no.',function(){
    const res=add(2);
    expect(res).toBe(4);
  });
});

describe('square',function(){
  it('should square a no.',function () {
    const res=sq(3);
    expect(res).toBe(9);
  });
});
*/
