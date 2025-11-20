import { useContext, useState } from 'react';
import { LanguageContext, type LanguageContextType } from '../context/LanguageContext';
import '../styles/pages.css';

export function Contact() {
    const { t } = useContext(LanguageContext) as LanguageContextType;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            setSubmitted(false);
        }, 3000);
    };

    return (
        <div className="page contact-page">
            {/* Hero Section */}
            <section className="page-hero">
                <h1>{t('contact.title')}</h1>
                <p>{t('contact.subtitle')}</p>
            </section>

            {/* Contact Info and Form */}
            <section className="content-section">
                <div className="contact-container">
                    {/* Contact Information */}
                    <div className="contact-info">
                        <div className="info-block">
                            <h3>📍 {t('contact.address')}</h3>
                            <p>123 Medical Plaza<br />New York, NY 10001<br />USA</p>
                        </div>
                        <div className="info-block">
                            <h3>📞 {t('contact.phone')}</h3>
                            <p>+1 (212) 555-0123<br />+86 (10) 8000-0123</p>
                        </div>
                        <div className="info-block">
                            <h3>✉️ {t('contact.email')}</h3>
                            <p>info@healusa.com<br />support@healusa.com</p>
                        </div>
                        <div className="info-block">
                            <h3>🕐 {t('contact.hours')}</h3>
                            <p>Monday - Friday: 9AM - 6PM<br />Saturday: 10AM - 4PM<br />Sunday: Closed</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form-container">
                        {submitted && (
                            <div className="success-message">
                                ✓ {t('contact.success')}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">{t('contact.name')} *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder={t('contact.name_placeholder')}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">{t('contact.email_address')} *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder={t('contact.email_placeholder')}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">{t('contact.phone_number')} *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder={t('contact.phone_placeholder')}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">{t('contact.subject')} *</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    placeholder={t('contact.subject_placeholder')}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">{t('contact.message')} *</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    placeholder={t('contact.message_placeholder')}
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary">
                                {t('contact.send')}
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
