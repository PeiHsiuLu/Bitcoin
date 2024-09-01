import React, { useState } from 'react'; // 確保導入 useState

const Navbar = () => {
  // Define your function to handle the scroll
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="nav-scroller py-1 mb-3 border-bottom">
      <nav className="nav nav-underline justify-content-between">
        <button
          className="nav-item nav-link link-button"
          onClick={() => scrollToSection('philosophy')}
          style={{ backgroundColor: 'rgba(211, 211, 211, 0.1)' }}
        >
          <strong>網站理念</strong>
        </button>
        <button
          className="nav-item nav-link link-button"
          onClick={() => scrollToSection('bitcoin-introduction')}
          style={{ backgroundColor: 'rgba(211, 211, 211, 0.1)' }}
        >
          <strong>比特幣介紹</strong>
        </button>
        <button
          className="nav-item nav-link link-button"
          onClick={() => scrollToSection('dca-introduction')}
          style={{ backgroundColor: 'rgba(211, 211, 211, 0.1)' }}
        >
          <strong>DCA平均成本法介紹</strong>
        </button>
        <button
          className="nav-item nav-link link-button"
          onClick={() => scrollToSection('forum')}
          style={{ backgroundColor: 'rgba(211, 211, 211, 0.1)' }}
        >
          <strong>用戶論壇</strong>
        </button>
      </nav>
    </div>
  );
};

export default Navbar;