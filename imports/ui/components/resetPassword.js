import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import {Session} from 'meteor/session';
import {History} from '/imports/routes/routes';

export default class forgotPassword extends React.Component{
  constructor(props){
    super(props);
    this.state={
      status:''
    };
  }
  formsubmit(e){
    e.preventDefault();
    let newPassword=this.refs.password.value;
    let token=Session.get('global_token');
    Accounts.resetPassword(token, newPassword, (err)=>{
      if (err) {
        this.setState({status:err.reason});
      }
      else {
        this.setState({status:"Password reset"});
      }
    });
  }
  render(){
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Reset Password</h1>
          {this.state.status ? <p>{this.state.status}</p> :undefined }
          <form onSubmit={this.formsubmit.bind(this)} className="boxed-view__form">
            <input type="password" ref="password" name="password" placeholder="New Password"/>
            <button className="button button--space" type="Submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
