import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext, type LanguageContextType } from '../context/LanguageContext';
import '../styles/footer.css';

export function Footer() {
    const { t } = useContext(LanguageContext) as LanguageContextType;

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3>🏥 HealUSA</h3>
                    <p>Professional medical assistance for Chinese patients seeking healthcare in the USA</p>
                    <div className="social-links">
                        <a href="#" aria-label="Facebook">f</a>
                        <a href="#" aria-label="WeChat">微</a>
                        <a href="#" aria-label="WhatsApp">W</a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">{t('nav.home')}</Link></li>
                        <li><Link to="/about">{t('nav.about')}</Link></li>
                        <li><Link to="/services">{t('nav.services')}</Link></li>
                        <li><Link to="/procedures">{t('nav.procedures')}</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="#dental">Dental</a></li>
                        <li><a href="#vision">Vision Care</a></li>
                        <li><a href="#orthopedic">Orthopedic</a></li>
                        <li><a href="#cardiology">Cardiology</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4>Contact Info</h4>
                    <p>📞 +1 (212) 555-0123<br />📧 info@healusa.com</p>
                    <p>🕐 Mon-Fri: 9AM-6PM<br />Sat: 10AM-4PM EST</p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>{t('footer.copyright')}</p>
            </div>
        </footer>
    );
}
