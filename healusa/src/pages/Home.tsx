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
                        <Link to="/appointment" className="btn btn-secondary">
                            {t('nav.contact')}
                        </Link>
                    </div>
                </div>
                <div className="hero-image">
                    <img src="https://via.placeholder.com/500x400?text=Medical+Assistance" alt="Medical" />
                </div>
            </section>

            {/* Why Choose HealUSA */}
            <section className="features">
                <h2>{t('about.why_choose')}</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">📋</div>
                        <h3>{t('story.service1_title')}</h3>
                        <p>{t('story.service1_desc')}</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🏥</div>
                        <h3>{t('story.service2_title')}</h3>
                        <p>{t('story.service2_desc')}</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">✅</div>
                        <h3>{t('story.service3_title')}</h3>
                        <p>{t('story.service3_desc')}</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">💵</div>
                        <h3>{t('story.service4_title')}</h3>
                        <p>{t('story.service4_desc')}</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🤝</div>
                        <h3>{t('story.service5_title')}</h3>
                        <p>{t('story.service5_desc')}</p>
                    </div>
                </div>
                <p className="story-text" style={{ textAlign: 'center', marginTop: '2rem', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>{t('story.section6_p3')}</p>
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
