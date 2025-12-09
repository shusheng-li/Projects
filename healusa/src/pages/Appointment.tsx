import { useContext, useState } from 'react';
import { LanguageContext, type LanguageContextType } from '../context/LanguageContext';
import emailjs from '@emailjs/browser';
import '../styles/pages.css';
import logoPNG from '../assets/logo.png';
import wechatQR from '../assets/wechat_qr.png';

export function Appointment() {
    const { t } = useContext(LanguageContext) as LanguageContextType;
    const [formData, setFormData] = useState({
        name: '',
        wechat: '',
        phone: '',
        procedure: '',
        date: '',
        time: '',
        notes: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const procedures = [
        'Dental Implants',
        'LASIK Surgery',
        'Knee Replacement',
        'Heart Surgery',
        'Fertility Treatment',
        'Other'
    ];

    const timeSlots = [
        '09:00 AM',
        '10:00 AM',
        '11:00 AM',
        '01:00 PM',
        '02:00 PM',
        '03:00 PM',
        '04:00 PM'
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // Initialize EmailJS with your public key
            emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

            // Prepare template parameters
            const templateParams = {
                from_name: formData.name,
                patient_name: formData.name,
                patient_wechat: formData.wechat,
                patient_phone: formData.phone,
                procedure_type: formData.procedure,
                appointment_date: formData.date,
                appointment_time: formData.time,
                additional_notes: formData.notes || 'No additional notes',
                message: [
                    `New appointment request from ${formData.name}`,
                    '',
                    `Looking for help in ${formData.procedure}`,
                    `Preferred on ${formData.date} at ${formData.time}`,
                    '',
                    `Phone: ${formData.phone}`,
                    `Contact WeChat: ${formData.wechat}`,
                    '',
                    `Notes: ${formData.notes || 'N/A'}`
                ].join('\n')
            };

            // Send email using EmailJS
            const response = await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                templateParams
            );

            console.log('Email sent successfully:', response);
            setSubmitted(true);

            // Reset form after 3 seconds
            setTimeout(() => {
                setFormData({
                    name: '',
                    wechat: '',
                    phone: '',
                    procedure: '',
                    date: '',
                    time: '',
                    notes: ''
                });
                setSubmitted(false);
            }, 3000);

        } catch (err) {
            console.error('Failed to send email:', err);
            setError('Failed to send appointment request. Please try again or contact us directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Get minimum date (today)
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="page appointment-page">
            <div className="page-banner">
                <img src={logoPNG} alt="HealUSA Logo" className="page-logo" />
                <p className="page-tagline">{t('global.tagline')}</p>
            </div>
            {/* Hero Section */}
            <section className="page-hero">
                <h1>{t('contact.title')}</h1>
                <p>{t('contact.subtitle')}</p>
            </section>

            {/* Appointment Form */}
            <section className="content-section">
                <div className="appointment-container">
                    {/* WeChat QR Code */}
                    <div className="qr-code-section">
                        <div className="qr-code-card">
                            <h3>{t('contact.wechat_scan')}</h3>
                            <img src={wechatQR} alt="WeChat QR Code" className="qr-code-image" />
                            <p className="qr-code-text">{t('contact.wechat_scan_text')}</p>
                        </div>
                    </div>

                    <div className="appointment-form-wrapper">
                        {submitted && (
                            <div className="success-message">
                                ✓ {t('contact.success')}
                            </div>
                        )}

                        {error && (
                            <div className="error-message">
                                ✗ {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="appointment-form">
                            <div className="form-row">
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
                                    <label htmlFor="wechat">{t('contact.wechat')} *</label>
                                    <input
                                        type="text"
                                        id="wechat"
                                        name="wechat"
                                        value={formData.wechat}
                                        onChange={handleChange}
                                        required
                                        placeholder={t('contact.wechat_placeholder')}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="phone">{t('contact.phone')} *</label>
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
                                    <label htmlFor="procedure">{t('contact.procedure')} *</label>
                                    <select
                                        id="procedure"
                                        name="procedure"
                                        value={formData.procedure}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">{t('contact.select_procedure')}</option>
                                        {procedures.map(proc => (
                                            <option key={proc} value={proc}>{proc}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="date">{t('contact.date')} *</label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        min={today}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="time">{t('contact.time')} *</label>
                                    <select
                                        id="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">{t('contact.select_time')}</option>
                                        {timeSlots.map(slot => (
                                            <option key={slot} value={slot}>{slot}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="notes">{t('contact.notes')}</label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder={t('contact.notes_placeholder')}
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary btn-large" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : t('contact.book')}
                            </button>
                        </form>

                        {/* Info Box */}
                        <div className="info-box">
                            <h3>ℹ️ {t('contact.info')}</h3>
                            <p>{t('contact.info_text')}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
