import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext, type LanguageContextType } from '../context/LanguageContext';
import '../styles/pages.css';
import logoPNG from '../assets/logo.png';

export function Letter() {
    const { t } = useContext(LanguageContext) as LanguageContextType;

    return (
        <div className="page letter-page">
            <div className="page-banner">
                <img src={logoPNG} alt="HealUSA Logo" className="page-logo" />
                <p className="page-tagline">{t('global.tagline')}</p>
            </div>

            {/* Hero Section */}
            <section className="page-hero">
                <h1>{t('letter.title')}</h1>
            </section>

            {/* Letter Content */}
            <section className="content-section letter-content">
                <div className="letter-greeting">
                    <p className="letter-text">{t('letter.greeting')}</p>
                </div>

                <div className="letter-opening">
                    <p className="letter-text">{t('letter.opening1')}</p>
                    <p className="letter-text">{t('letter.opening2')}</p>
                    <p className="letter-text">{t('letter.opening3')}</p>
                </div>

                <div className="letter-intro">
                    <p className="letter-text">{t('letter.intro1')}</p>
                    <p className="letter-text">{t('letter.intro2')}</p>
                    <p className="letter-text">{t('letter.intro3')}</p>
                </div>

                <div className="letter-highlight-box">
                    <p className="letter-highlight">{t('letter.highlight1')}</p>
                </div>

                <div className="letter-divider"></div>

                {/* Why Contact Section */}
                <div className="letter-section">
                    <h2>{t('letter.why_title')}</h2>
                    <p className="letter-text">{t('letter.why1')}</p>
                    <p className="letter-text">{t('letter.why2')}</p>
                    <p className="letter-text">{t('letter.why3')}</p>
                    <p className="letter-text">{t('letter.why4')}</p>
                    <p className="letter-text">{t('letter.why5')}</p>
                    <p className="letter-text">{t('letter.why6')}</p>
                </div>

                {/* Trust Section */}
                <div className="letter-section">
                    <h2>{t('letter.trust_title')}</h2>
                    <p className="letter-text">{t('letter.trust_intro')}</p>
                    <ul className="letter-list">
                        <li>{t('letter.trust1')}</li>
                        <li>{t('letter.trust2')}</li>
                        <li>{t('letter.trust3')}</li>
                        <li>{t('letter.trust4')}</li>
                        <li>{t('letter.trust5')}</li>
                    </ul>
                    <p className="letter-text">{t('letter.trust_because')}</p>
                    <p className="letter-text letter-emphasis">{t('letter.trust_emphasis')}</p>
                </div>

                {/* Commitment Section */}
                <div className="letter-section">
                    <p className="letter-text">{t('letter.commitment1')}</p>
                    <p className="letter-text">{t('letter.commitment2')}</p>
                    <p className="letter-text">{t('letter.commitment3')}</p>
                    <p className="letter-text">{t('letter.commitment4')}</p>
                </div>

                {/* Promise Section */}
                <div className="letter-section">
                    <h2>{t('letter.promise_title')}</h2>
                    <p className="letter-text">{t('letter.promise1')}</p>
                    <p className="letter-text">{t('letter.promise2')}</p>
                    <p className="letter-text">{t('letter.promise3')}</p>
                    <p className="letter-text">{t('letter.promise4')}</p>
                </div>

                {/* Final Message */}
                <div className="letter-section">
                    <p className="letter-text letter-quote">{t('letter.final_quote')}</p>
                    <p className="letter-text">{t('letter.final1')}</p>
                    <p className="letter-text">{t('letter.final2')}</p>
                </div>

                {/* Call to Action */}
                <div className="letter-cta">
                    <p className="letter-text letter-strong">{t('letter.cta1')}</p>
                    <p className="letter-text">{t('letter.cta2')}</p>
                    <div className="letter-buttons">
                        <Link to="/contact" className="btn btn-primary btn-large">
                            {t('nav.contact')}
                        </Link>
                        <Link to="/appointment" className="btn btn-secondary btn-large">
                            {t('nav.appointment')}
                        </Link>
                    </div>
                </div>

                {/* Signature */}
                <div className="letter-signature">
                    <p className="signature-name">{t('letter.signature_name')}</p>
                    <p className="signature-title">{t('letter.signature_title')}</p>
                    <p className="signature-message">{t('letter.signature_message')}</p>
                </div>
            </section>
        </div>
    );
}
