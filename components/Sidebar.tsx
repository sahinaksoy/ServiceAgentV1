import React, { useState } from 'react';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="page-wrapper">
      <header className="top-header">
        <button 
          className="menu-trigger"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </header>

      <div className="layout-container">
        <aside className={`side-menu ${isMenuOpen ? 'active' : ''}`}>
          <nav className="nav-content">
            {/* Menü içeriği */}
          </nav>
        </aside>

        <main className="main-content">
          <div className="content-wrapper">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout; 