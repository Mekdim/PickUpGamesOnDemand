import React from 'react';
import Terms from '../components/Terms';
import Footer from '../components/Footer.js';
import HeaderWrapped from './HeaderWrapped';

function TermsPage() {
  return (
    <div>
      <HeaderWrapped />
      <Terms />
      <Footer />
    </div>
  );
}

export default TermsPage;
