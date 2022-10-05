import React from 'react';
import SignUp from '../components/SignUp';
import Footer from '../components/Footer.js';
import HeaderWrapped from './HeaderWrapped';

function SignInPage() {
  return (
    <div>
      <HeaderWrapped />
      <SignUp />
      <Footer />
    </div>
  );
}

export default SignInPage;
