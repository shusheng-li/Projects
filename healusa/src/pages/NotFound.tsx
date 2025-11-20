import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { LanguageContext, type LanguageContextType } from '../context/LanguageContext';
import '../styles/pages.css';

export function NotFound() {
    const { t } = useContext(LanguageContext) as LanguageContextType;

    return (
        <div className="page not-found-page">
            <div className="not-found-content">
                <h1>404</h1>
                <h2>{t('notfound.title')}</h2>
                <p>{t('notfound.message')}</p>
                <Link to="/" className="btn btn-primary">
                    {t('notfound.back_home')}
                </Link>
            </div>
        </div>
    );
}
