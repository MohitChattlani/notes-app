import React from 'react';
import {Link} from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export default class forgotPassword extends React.Component{
  constructor(props){
    super(props);
    this.state={
      status:''
    };
  }
  formsubmit(e){
    e.preventDefault();
    let email=this.refs.email.value;
    if (!email) {
      this.setState({status:"Please enter email"});
      return;
    }
    Accounts.forgotPassword({email}, (err)=>{
        if (err) {
          this.setState({status:err.reason});
        }
        else {
          this.setState({status:"Mail sent"});
        }
    });
  }
  render(){
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Forgot Password</h1>
          {this.state.status ? <p>{this.state.status}</p> :undefined }
          <form onSubmit={this.formsubmit.bind(this)} className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="Email"/>
            <button className="button button--space" type="Submit">Submit</button>
          </form>
          <Link to="/">Go Back</Link>
        </div>
      </div>
    );
  }
}
