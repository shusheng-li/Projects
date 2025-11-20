import { useContext } from 'react';
import { LanguageContext, type LanguageContextType } from '../context/LanguageContext';
import '../styles/pages.css';

export function About() {
    const { t } = useContext(LanguageContext) as LanguageContextType;

    return (
        <div className="page about-page">
            {/* Hero Section */}
            <section className="page-hero">
                <h1>{t('about.title')}</h1>
                <p>{t('about.subtitle')}</p>
            </section>

            {/* Mission Section */}
            <section className="content-section">
                <div className="content-grid">
                    <div>
                        <h2>{t('about.mission')}</h2>
                        <p>{t('about.mission_desc')}</p>
                    </div>
                    <div className="image-placeholder">
                        <img src="https://via.placeholder.com/400x300?text=Our+Mission" alt="Mission" />
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="content-section">
                <h2>{t('about.team')}</h2>
                <div className="team-grid">
                    <div className="team-member">
                        <img src="https://via.placeholder.com/150?text=Dr.+Smith" alt="Doctor" className="team-avatar" />
                        <h3>Dr. John Smith</h3>
                        <p className="role">{t('about.medical_director')}</p>
                        <p>{t('about.team_desc1')}</p>
                    </div>
                    <div className="team-member">
                        <img src="https://via.placeholder.com/150?text=Sarah+Johnson" alt="Coordinator" className="team-avatar" />
                        <h3>Sarah Johnson</h3>
                        <p className="role">{t('about.coordinator')}</p>
                        <p>{t('about.team_desc2')}</p>
                    </div>
                    <div className="team-member">
                        <img src="https://via.placeholder.com/150?text=Lisa+Chen" alt="Translator" className="team-avatar" />
                        <h3>Lisa Chen</h3>
                        <p className="role">{t('about.translator')}</p>
                        <p>{t('about.team_desc3')}</p>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="content-section stats">
                <h2>{t('about.experience')}</h2>
                <div className="stats-grid">
                    <div className="stat">
                        <h3>5000+</h3>
                        <p>{t('about.patients')}</p>
                    </div>
                    <div className="stat">
                        <h3>15+</h3>
                        <p>{t('about.years')}</p>
                    </div>
                    <div className="stat">
                        <h3>50+</h3>
                        <p>{t('about.procedures')}</p>
                    </div>
                    <div className="stat">
                        <h3>98%</h3>
                        <p>{t('about.satisfaction')}</p>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="content-section">
                <h2>{t('about.why_choose')}</h2>
                <div className="checklist">
                    <div className="check-item">✓ {t('about.reason1')}</div>
                    <div className="check-item">✓ {t('about.reason2')}</div>
                    <div className="check-item">✓ {t('about.reason3')}</div>
                    <div className="check-item">✓ {t('about.reason4')}</div>
                </div>
            </section>
        </div>
    );
}
