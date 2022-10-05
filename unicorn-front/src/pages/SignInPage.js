import React from 'react';
import SignIn from '../components/SignIn';
import Footer from '../components/Footer.js';
import HeaderWrapped from './HeaderWrapped';

function SignInPage() {
  return (
    <div>
      <HeaderWrapped />
      <SignIn />
      <Footer />
    </div>
  );
}

export default SignInPage;
