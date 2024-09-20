import React from 'react';

function Footer() {
  return (
    <footer className="footer py-4 text-center bg-black text-gray-500">
      <p>&copy; {new Date().getFullYear()} CharConnect. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
