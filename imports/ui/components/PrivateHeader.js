import React from 'react';
import {Accounts} from 'meteor/accounts-base';
import PropTypes from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import {Link} from 'react-router-dom';

export const PrivateHeader =(props)=>{
  const navImageSrc=props.isNavOpen ? "/images/x.svg" : "/images/bars.svg";
  return (
    <div className="header">
      <div className="header-content">
        <img src={navImageSrc} className="header__nav-toggle" onClick={()=>{
          Session.set('isNavOpen',!props.isNavOpen);
        }}/>
        <h1 className="header__title">{props.title}</h1>
        <div className="header__rightalign">
          <Link to="/changePassword" className="button button--link-text">change Password</Link>
          <button className="button button--link-text" onClick={()=>{
            props.handlelogout();
          }}>Logout</button>
        </div>
      </div>
    </div>
  );
};
PrivateHeader.propTypes={
  title:PropTypes.string.isRequired,
  handlelogout:PropTypes.func.isRequired,
  isNavOpen:PropTypes.bool.isRequired
};

export default createContainer(()=>{
  return {
    handlelogout:()=>{
      Accounts.logout();
    },
    isNavOpen:Session.get('isNavOpen')
  };
},PrivateHeader);
