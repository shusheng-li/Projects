import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext, type LanguageContextType } from '../context/LanguageContext';
import '../styles/header.css';
import logoPNG from '../assets/logo3.png';

export function Header() {
    const { language, setLanguage, t } = useContext(LanguageContext) as LanguageContextType;
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="header">
            <div className="header-container">
                <Link to="/" className="logo">
                    <img src={logoPNG} alt="HealUSA Logo" className="logo-image" />
                    <span className="logo-text">HealUSA</span>
                </Link>

                <nav className={`nav ${menuOpen ? 'open' : ''}`}>
                    <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
                        {t('nav.home')}
                    </Link>
                    <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>
                        {t('nav.about')}
                    </Link>
                    <Link to="/services" className="nav-link" onClick={() => setMenuOpen(false)}>
                        {t('nav.services')}
                    </Link>
                    <Link to="/procedures" className="nav-link" onClick={() => setMenuOpen(false)}>
                        {t('nav.procedures')}
                    </Link>
                    <Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>
                        {t('nav.contact')}
                    </Link>
                </nav>

                <div className="header-actions">
                    <button
                        className="language-toggle"
                        onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
                        aria-label="Toggle language"
                    >
                        <span className="lang-badge">{language === 'en' ? '中文' : 'EN'}</span>
                    </button>

                    <Link to="/appointment" className="btn btn-primary btn-sm">
                        {t('nav.appointment')}
                    </Link>

                    <button
                        className="menu-toggle"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </header>
    );
}
