import { useContext } from 'react';
import { LanguageContext, type LanguageContextType } from '../context/LanguageContext';
import '../styles/pages.css';
import logoPNG from '../assets/logo.png';
import storyBackground from '../assets/personal_photo_9.jpeg';

export function Story() {
    const { t } = useContext(LanguageContext) as LanguageContextType;

    return (
        <div className="page story-page" style={{ backgroundImage: `url(${storyBackground})` }}>
            <div className="page-banner">
                <img src={logoPNG} alt="HealUSA Logo" className="page-logo" />
                <p className="page-tagline">{t('global.tagline')}</p>
            </div>

            {/* Hero Section */}
            <section className="page-hero">
                <h1>{t('story.title')}</h1>
                <p className="story-subtitle">{t('story.subtitle')}</p>
            </section>

            {/* Story Content */}
            <section className="content-section story-content">
                <div className="story-intro">
                    <p className="story-text">{t('story.intro1')}</p>
                    <p className="story-text">{t('story.intro2')}</p>
                    <p className="story-text">{t('story.intro3')}</p>
                </div>

                <div className="story-divider"></div>

                {/* Section 1 */}
                <div className="story-section">
                    <h2>{t('story.section1_title')}</h2>
                    <p className="story-text">{t('story.section1_p1')}</p>
                    <p className="story-text">{t('story.section1_p2')}</p>
                    <p className="story-text">{t('story.section1_p3')}</p>
                    <p className="story-text">{t('story.section1_p4')}</p>
                    <p className="story-text">{t('story.section1_p5')}</p>
                    <p className="story-text">{t('story.section1_p6')}</p>
                    <p className="story-text">{t('story.section1_p7')}</p>
                </div>

                <div className="story-divider"></div>

                {/* Section 2 */}
                <div className="story-section">
                    <h2>{t('story.section2_title')}</h2>
                    <p className="story-text">{t('story.section2_p1')}</p>
                    <p className="story-text">{t('story.section2_p2')}</p>
                    <p className="story-text">{t('story.section2_p3')}</p>
                    <p className="story-text">{t('story.section2_p4')}</p>
                    <p className="story-text">{t('story.section2_p5')}</p>
                    <p className="story-text">{t('story.section2_p6')}</p>
                    <p className="story-text">{t('story.section2_p7')}</p>
                </div>

                <div className="story-divider"></div>

                {/* Section 3 */}
                <div className="story-section">
                    <h2>{t('story.section3_title')}</h2>
                    <p className="story-text">{t('story.section3_p1')}</p>
                    <p className="story-text">{t('story.section3_p2')}</p>
                    <p className="story-text">{t('story.section3_p3')}</p>
                    <p className="story-text">{t('story.section3_p4')}</p>
                    <p className="story-text">{t('story.section3_p5')}</p>
                </div>

                <div className="story-divider"></div>

                {/* Section 4 */}
                <div className="story-section">
                    <h2>{t('story.section4_title')}</h2>
                    <p className="story-text">{t('story.section4_p1')}</p>
                    <p className="story-text">{t('story.section4_p2')}</p>
                    <p className="story-text">{t('story.section4_p3')}</p>
                    <p className="story-text">{t('story.section4_p4')}</p>
                </div>

                <div className="story-divider"></div>

                {/* Section 5 */}
                <div className="story-section">
                    <h2>{t('story.section5_title')}</h2>
                    <p className="story-text">{t('story.section5_p1')}</p>
                    <p className="story-text">{t('story.section5_p2')}</p>
                    <p className="story-text">{t('story.section5_p3')}</p>
                    <p className="story-text story-quote">{t('story.section5_quote')}</p>
                    <p className="story-text">{t('story.section5_p4')}</p>
                    <p className="story-text">{t('story.section5_p5')}</p>
                    <ul className="story-list">
                        <li>{t('story.section5_list1')}</li>
                        <li>{t('story.section5_list2')}</li>
                        <li>{t('story.section5_list3')}</li>
                    </ul>
                    <p className="story-text">{t('story.section5_p6')}</p>
                    <p className="story-text">{t('story.section5_p7')}</p>
                </div>

                <div className="story-divider"></div>

                {/* Section 6 */}
                <div className="story-section">
                    <h2>{t('story.section6_title')}</h2>
                    <p className="story-text">{t('story.section6_p1')}</p>
                    <p className="story-text">{t('story.section6_p2')}</p>
                    <div className="story-services">
                        <div className="story-service-item">
                            <span className="service-icon">📋</span>
                            <h3>{t('story.service1_title')}</h3>
                            <p>{t('story.service1_desc')}</p>
                        </div>
                        <div className="story-service-item">
                            <span className="service-icon">🏥</span>
                            <h3>{t('story.service2_title')}</h3>
                            <p>{t('story.service2_desc')}</p>
                        </div>
                        <div className="story-service-item">
                            <span className="service-icon">✅</span>
                            <h3>{t('story.service3_title')}</h3>
                            <p>{t('story.service3_desc')}</p>
                        </div>
                        <div className="story-service-item">
                            <span className="service-icon">💵</span>
                            <h3>{t('story.service4_title')}</h3>
                            <p>{t('story.service4_desc')}</p>
                        </div>
                        <div className="story-service-item">
                            <span className="service-icon">🤝</span>
                            <h3>{t('story.service5_title')}</h3>
                            <p>{t('story.service5_desc')}</p>
                        </div>
                    </div>
                    <p className="story-text">{t('story.section6_p3')}</p>
                </div>

                <div className="story-divider"></div>

                {/* Section 7 */}
                <div className="story-section">
                    <h2>{t('story.section7_title')}</h2>
                    <p className="story-text">{t('story.section7_p1')}</p>
                    <p className="story-text">{t('story.section7_p2')}</p>
                    <p className="story-text">{t('story.section7_p3')}</p>
                    <p className="story-text">{t('story.section7_p4')}</p>
                </div>

                <div className="story-divider"></div>

                {/* Section 8 */}
                <div className="story-section story-closing">
                    <h2>{t('story.section8_title')}</h2>
                    <p className="story-text">{t('story.section8_p1')}</p>
                    <p className="story-text">{t('story.section8_p2')}</p>
                    <p className="story-text">{t('story.section8_p3')}</p>
                    <p className="story-text story-highlight">{t('story.section8_highlight')}</p>
                    <p className="story-text">{t('story.section8_p4')}</p>

                    <div className="story-signature">
                        <p className="signature-name">{t('story.signature_name')}</p>
                        <p className="signature-title">{t('story.signature_title')}</p>
                        <p className="signature-quote">{t('story.signature_quote')}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
