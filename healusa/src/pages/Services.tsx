import { useContext } from 'react';
import { LanguageContext, type LanguageContextType } from '../context/LanguageContext';
import '../styles/pages.css';
import logoPNG from '../assets/logo.png';

export function Services() {
    const { t } = useContext(LanguageContext) as LanguageContextType;

    const services = [
        {
            id: 1,
            icon: '🦷',
            title: t('services.dental'),
            description: t('services.dental_desc'),
            features: ['Dental Implants', 'Root Canals', 'Cosmetic Dentistry', 'Teeth Whitening']
        },
        {
            id: 2,
            icon: '👁️',
            title: t('services.vision'),
            description: t('services.vision_desc'),
            features: ['LASIK Surgery', 'Cataract Surgery', 'Eye Exams', 'Contact Lenses']
        },
        {
            id: 3,
            icon: '🏥',
            title: t('services.orthopedic'),
            description: t('services.orthopedic_desc'),
            features: ['Joint Replacement', 'Arthroscopy', 'Fracture Treatment', 'Sports Medicine']
        },
        {
            id: 4,
            icon: '❤️',
            title: t('services.cardiology'),
            description: t('services.cardiology_desc'),
            features: ['Heart Surgery', 'Angioplasty', 'Cardiac Imaging', 'Risk Assessment']
        },
        {
            id: 5,
            icon: '🧠',
            title: t('services.neurology'),
            description: t('services.neurology_desc'),
            features: ['Brain Surgery', 'Tumor Removal', 'Spine Surgery', 'Pain Management']
        },
        {
            id: 6,
            icon: '👶',
            title: t('services.reproductive'),
            description: t('services.reproductive_desc'),
            features: ['Fertility Treatment', 'IVF', 'Prenatal Care', 'Obstetrics']
        }
    ];

    return (
        <div className="page services-page">
            <div className="page-banner">
                <img src={logoPNG} alt="HealUSA Logo" className="page-logo" />
                <p className="page-tagline">{t('global.tagline')}</p>
            </div>
            {/* Hero Section */}
            <section className="page-hero">
                <h1>{t('services.title')}</h1>
                <p>{t('services.subtitle')}</p>
            </section>

            {/* Services Grid */}
            <section className="content-section">
                <div className="services-grid">
                    {services.map((service) => (
                        <div key={service.id} className="service-card">
                            <div className="service-icon">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p className="service-description">{service.description}</p>
                            <ul className="service-features">
                                {service.features.map((feature, idx) => (
                                    <li key={idx}>• {feature}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Process Section */}
            <section className="content-section">
                <h2>{t('services.process')}</h2>
                <div className="process-steps">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h3>{t('services.step1')}</h3>
                        <p>{t('services.step1_desc')}</p>
                    </div>
                    <div className="arrow">→</div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <h3>{t('services.step2')}</h3>
                        <p>{t('services.step2_desc')}</p>
                    </div>
                    <div className="arrow">→</div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <h3>{t('services.step3')}</h3>
                        <p>{t('services.step3_desc')}</p>
                    </div>
                    <div className="arrow">→</div>
                    <div className="step">
                        <div className="step-number">4</div>
                        <h3>{t('services.step4')}</h3>
                        <p>{t('services.step4_desc')}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
