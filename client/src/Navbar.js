import React from 'react';

// This would be Navbar.js
const Navbar = () => {
  // Define your function to handle the scroll
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="nav-scroller py-1 mb-3 border-bottom">
      <nav className="nav nav-underline justify-content-between">
        <button className="nav-item nav-link link-button" onClick={() => scrollToSection('philosophy')}>
          <strong>網站理念</strong>
        </button>
        <button className="nav-item nav-link link-button" onClick={() => scrollToSection('bitcoin-introduction')}>
          <strong>比特幣介紹</strong>
        </button>
        <button className="nav-item nav-link link-button" onClick={() => scrollToSection('dca-introduction')}>
          <strong>DCA平均成本法介紹</strong>
        </button>
        <button className="nav-item nav-link link-button" onClick={() => scrollToSection('forum')}>
          <strong>用戶論壇</strong>
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
