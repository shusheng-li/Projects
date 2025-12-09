import { useContext } from 'react';
import { LanguageContext, type LanguageContextType } from '../context/LanguageContext';
import '../styles/pages.css';
import logoPNG from '../assets/logo.png';

export function About() {
    const { t } = useContext(LanguageContext) as LanguageContextType;

    return (
        <div className="page about-page">
            <div className="page-banner">
                <img src={logoPNG} alt="HealUSA Logo" className="page-logo" />
                <p className="page-tagline">{t('global.tagline')}</p>
            </div>
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

            {/* Journey Process */}
            <section className="content-section">
                <h2>{t('about.journey_title')}</h2>
                <p className="journey-intro">{t('about.journey_subtitle')}</p>

                <div className="journey-flowchart">
                    <div className="flow-step">
                        <div className="step-badge">1</div>
                        <div className="step-icon">📋</div>
                        <h3>{t('about.step1_title')}</h3>
                        <ul>
                            <li>{t('about.step1_point1')}</li>
                            <li>{t('about.step1_point2')}</li>
                            <li>{t('about.step1_point3')}</li>
                            <li>{t('about.step1_point4')}</li>
                        </ul>
                    </div>

                    <div className="flow-step">
                        <div className="step-badge">2</div>
                        <div className="step-icon">🏥</div>
                        <h3>{t('about.step2_title')}</h3>
                        <ul>
                            <li>{t('about.step2_point1')}</li>
                            <li>{t('about.step2_point2')}</li>
                            <li>{t('about.step2_point3')}</li>
                        </ul>
                    </div>

                    <div className="flow-step">
                        <div className="step-badge">3</div>
                        <div className="step-icon">✈️</div>
                        <h3>{t('about.step3_title')}</h3>
                        <ul>
                            <li>{t('about.step3_point1')}</li>
                            <li>{t('about.step3_point2')}</li>
                            <li>{t('about.step3_point3')}</li>
                            <li>{t('about.step3_point4')}</li>
                        </ul>
                    </div>

                    <div className="flow-step">
                        <div className="step-badge">4</div>
                        <div className="step-icon">💼</div>
                        <h3>{t('about.step4_title')}</h3>
                        <ul>
                            <li>{t('about.step4_point1')}</li>
                            <li>{t('about.step4_point2')}</li>
                            <li>{t('about.step4_point3')}</li>
                            <li>{t('about.step4_point4')}</li>
                        </ul>
                    </div>

                    <div className="flow-step">
                        <div className="step-badge">5</div>
                        <div className="step-icon">✅</div>
                        <h3>{t('about.step5_title')}</h3>
                        <ul>
                            <li>{t('about.step5_point1')}</li>
                            <li>{t('about.step5_point2')}</li>
                            <li>{t('about.step5_point3')}</li>
                        </ul>
                    </div>

                    <div className="flow-step">
                        <div className="step-badge">6</div>
                        <div className="step-icon">🛫</div>
                        <h3>{t('about.step6_title')}</h3>
                        <ul>
                            <li>{t('about.step6_point1')}</li>
                            <li>{t('about.step6_point2')}</li>
                            <li>{t('about.step6_point3')}</li>
                            <li>{t('about.step6_point4')}</li>
                        </ul>
                    </div>

                    <div className="flow-step">
                        <div className="step-badge">7</div>
                        <div className="step-icon">🏨</div>
                        <h3>{t('about.step7_title')}</h3>
                        <ul>
                            <li>{t('about.step7_point1')}</li>
                            <li>{t('about.step7_point2')}</li>
                            <li>{t('about.step7_point3')}</li>
                        </ul>
                    </div>

                    <div className="flow-step">
                        <div className="step-badge">8</div>
                        <div className="step-icon">🏥</div>
                        <h3>{t('about.step8_title')}</h3>
                        <ul>
                            <li>{t('about.step8_point1')}</li>
                            <li>{t('about.step8_point2')}</li>
                            <li>{t('about.step8_point3')}</li>
                            <li>{t('about.step8_point4')}</li>
                        </ul>
                    </div>

                    <div className="flow-step">
                        <div className="step-badge">9</div>
                        <div className="step-icon">💊</div>
                        <h3>{t('about.step9_title')}</h3>
                        <ul>
                            <li>{t('about.step9_point1')}</li>
                            <li>{t('about.step9_point2')}</li>
                            <li>{t('about.step9_point3')}</li>
                            <li>{t('about.step9_point4')}</li>
                        </ul>
                    </div>

                    <div className="flow-step">
                        <div className="step-badge">10</div>
                        <div className="step-icon">🔄</div>
                        <h3>{t('about.step10_title')}</h3>
                        <ul>
                            <li>{t('about.step10_point1')}</li>
                            <li>{t('about.step10_point2')}</li>
                            <li>{t('about.step10_point3')}</li>
                            <li>{t('about.step10_point4')}</li>
                        </ul>
                    </div>
                </div>

                <div className="journey-cta">
                    <p>{t('about.journey_cta')}</p>
                </div>
            </section>
        </div>
    );
}
