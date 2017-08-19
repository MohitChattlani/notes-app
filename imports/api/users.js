import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import {Accounts} from 'meteor/accounts-base';
import {Session} from 'meteor/session';
import {config_mail,config_password} from './config';

export const validateNewUser=(user)=>{
  const email=user.emails[0].address;
  console.log("validating");
  new SimpleSchema({
    email:{
      type:String,
      regEx:SimpleSchema.RegEx.Email
    }
  }).validate({email});
  return true;
};

if (Meteor.isServer) {
  Accounts.validateNewUser(validateNewUser);
}

if (Meteor.isServer) {
  process.env.MAIL_URL=`${config_mail}:${config_password}@smtp.gmail.com:465/`;
  Accounts.emailTemplates.siteName = 'notes-mohit.herokuapp.com';
  Accounts.emailTemplates.from = 'Mohit Chattlani<notes9@gmail.com>';
}
if (Meteor.isClient) {
  Accounts.onResetPasswordLink((token,done)=>{
    if (token) {
      Session.set('global_token',token);
    }
  });
}
