import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext, type LanguageContextType } from '../context/LanguageContext';
import '../styles/pages.css';
import logoPNG from '../assets/logo.png';

export function Home() {
    const { t } = useContext(LanguageContext) as LanguageContextType;

    return (
        <div className="page home-page">
            <div className="page-banner">
                <img src={logoPNG} alt="HealUSA Logo" className="page-logo" />
                <p className="page-tagline">{t('global.tagline')}</p>
            </div>
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>{t('home.title')}</h1>
                    <p className="hero-subtitle">{t('home.subtitle')}</p>
                    <div className="hero-buttons">
                        <Link to="/procedures" className="btn btn-primary">
                            {t('nav.procedures')}
                        </Link>
                        <Link to="/contact" className="btn btn-secondary">
                            {t('nav.contact')}
                        </Link>
                    </div>
                </div>
                <div className="hero-image">
                    <img src="https://via.placeholder.com/500x400?text=Medical+Assistance" alt="Medical" />
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <h2>{t('home.features')}</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🏥</div>
                        <h3>{t('home.feature1')}</h3>
                        <p>{t('home.feature1_desc')}</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">👨‍⚕️</div>
                        <h3>{t('home.feature2')}</h3>
                        <p>{t('home.feature2_desc')}</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🌐</div>
                        <h3>{t('home.feature3')}</h3>
                        <p>{t('home.feature3_desc')}</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">✅</div>
                        <h3>{t('home.feature4')}</h3>
                        <p>{t('home.feature4_desc')}</p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <h2>{t('home.cta_title')}</h2>
                <p>{t('home.cta_subtitle')}</p>
                <Link to="/appointment" className="btn btn-large">
                    {t('nav.appointment')}
                </Link>
            </section>
        </div>
    );
}
