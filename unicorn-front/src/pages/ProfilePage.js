import '../css/App.css';
import React from 'react';
import Profile from '../components/Profile';
import Footer from '../components/Footer.js';
import Cookies from 'js-cookie';
import HeaderWrapped from './HeaderWrapped';

function ProfilePage(props) {
  return (
    <div>
      <HeaderWrapped />
      <Profile firstname={props.firstname} lastname={Cookies.get('lastname')} />
      <Footer />
    </div>
  );
}

export default ProfilePage;
