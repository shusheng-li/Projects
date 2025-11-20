import { useContext, useState } from 'react';
import { LanguageContext, type LanguageContextType } from '../context/LanguageContext';
import '../styles/pages.css';

export function Appointment() {
    const { t } = useContext(LanguageContext) as LanguageContextType;
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        procedure: '',
        date: '',
        time: '',
        notes: ''
    });
    const [submitted, setSubmitted] = useState(false);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Appointment booked:', formData);
        setSubmitted(true);
        setTimeout(() => {
            setFormData({
                name: '',
                email: '',
                phone: '',
                procedure: '',
                date: '',
                time: '',
                notes: ''
            });
            setSubmitted(false);
        }, 3000);
    };

    // Get minimum date (today)
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="page appointment-page">
            {/* Hero Section */}
            <section className="page-hero">
                <h1>{t('appointment.title')}</h1>
                <p>{t('appointment.subtitle')}</p>
            </section>

            {/* Appointment Form */}
            <section className="content-section">
                <div className="appointment-form-wrapper">
                    {submitted && (
                        <div className="success-message">
                            ✓ {t('appointment.success')}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="appointment-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">{t('appointment.name')} *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder={t('appointment.name_placeholder')}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">{t('appointment.email')} *</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder={t('appointment.email_placeholder')}
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="phone">{t('appointment.phone')} *</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder={t('appointment.phone_placeholder')}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="procedure">{t('appointment.procedure')} *</label>
                                <select
                                    id="procedure"
                                    name="procedure"
                                    value={formData.procedure}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">{t('appointment.select_procedure')}</option>
                                    {procedures.map(proc => (
                                        <option key={proc} value={proc}>{proc}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="date">{t('appointment.date')} *</label>
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
                                <label htmlFor="time">{t('appointment.time')} *</label>
                                <select
                                    id="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">{t('appointment.select_time')}</option>
                                    {timeSlots.map(slot => (
                                        <option key={slot} value={slot}>{slot}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="notes">{t('appointment.notes')}</label>
                            <textarea
                                id="notes"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows={4}
                                placeholder={t('appointment.notes_placeholder')}
                            ></textarea>
                        </div>

                        <button type="submit" className="btn btn-primary btn-large">
                            {t('appointment.book')}
                        </button>
                    </form>

                    {/* Info Box */}
                    <div className="info-box">
                        <h3>ℹ️ {t('appointment.info')}</h3>
                        <p>{t('appointment.info_text')}</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
