import React from 'react';
import {Accounts} from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';

/*export default class PrivateHeader extends React.Component {
  render(){
    return (
      <div>
        <h1>{this.props.title}</h1>
        <button onClick={()=>{
          Accounts.logout();
        }}>Logout</button>
      </div>
    );
  }
}
*/

export const PrivateHeader =(props)=>{
  return (
    <div className="header">
      <div className="header-content">
        <h1 className="header__title">{props.title}</h1>
        <button className="button button--link-text" onClick={()=>{
          props.handlelogout();
        }}>Logout</button>
      </div>
    </div>
  );
};
PrivateHeader.propTypes={
  title:PropTypes.string.isRequired,
  handlelogout:PropTypes.func.isRequired
};

export default createContainer(()=>{
  return {
    handlelogout:()=>{
      Accounts.logout();
    }
  };
},PrivateHeader);
