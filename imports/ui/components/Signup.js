import React from 'react';
import {Link} from 'react-router-dom';
import {Accounts} from 'meteor/accounts-base';
import {createContainer} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

export class Signup extends React.Component{
  constructor(props){
    super(props);
    this.state={
      error:''
    };
  }
  formsubmit(e)
  {
    e.preventDefault();
    let email=this.refs.email.value.trim();
    let password=this.refs.password.value.trim();
    if (password && password.length<8) {
      return this.setState({
        error:"Password must be atleast 8 characters long"
      });
    }
    this.props.createUser({email,password},(err)=>{
      if (err)
      {
        this.setState({
          error: err.reason
        });
      }
      else {
        this.setState({
          error:''
        });
      }
    });
    /*this.setState({
      error:'Something went wrong'
    });
    */
  }
  render(){
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.formsubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="Email"/>
            <input type="password" ref="password" name="password" placeholder="Password"/>
            <button className="button" type="Submit">Create account</button>
          </form>
          <Link to="/">Have an account?</Link>
        </div>
      </div>
    );
  }
}
Signup.propTypes={
  createUser:PropTypes.func.isRequired
};
export default createContainer(()=>{
  return {
    createUser:Accounts.createUser
  };
},Signup);
