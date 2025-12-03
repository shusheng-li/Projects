import { useContext, useState, useMemo } from 'react';
import { LanguageContext, type LanguageContextType } from '../context/LanguageContext';
import '../styles/pages.css';
import logoPNG from '../assets/logo.png';

export function ProcedureCatalog() {
    const { t } = useContext(LanguageContext) as LanguageContextType;
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const procedures = [
        { id: 1, category: 'dental', name: 'Dental Implants', price: '$2000-5000', duration: '3-6 months', description: 'Permanent tooth replacement solution' },
        { id: 2, category: 'dental', name: 'Root Canal Treatment', price: '$800-1500', duration: '1-2 visits', description: 'Save your natural tooth' },
        { id: 3, category: 'vision', name: 'LASIK Eye Surgery', price: '$1500-3000', duration: '15-30 mins', description: 'Correct vision permanently' },
        { id: 4, category: 'vision', name: 'Cataract Surgery', price: '$2000-4000', duration: '30 mins', description: 'Restore clear vision' },
        { id: 5, category: 'orthopedic', name: 'Knee Replacement', price: '$15000-25000', duration: '1-2 hours', description: 'Restore mobility and reduce pain' },
        { id: 6, category: 'orthopedic', name: 'Hip Replacement', price: '$12000-22000', duration: '1.5-2 hours', description: 'Advanced joint surgery' },
        { id: 7, category: 'cardiology', name: 'Heart Bypass', price: '$30000-50000', duration: '3-4 hours', description: 'Improve blood flow to heart' },
        { id: 8, category: 'cardiology', name: 'Angioplasty', price: '$8000-15000', duration: '30-60 mins', description: 'Open blocked arteries' },
        { id: 9, category: 'reproductive', name: 'Fertility Treatment', price: '$5000-10000', duration: 'Variable', description: 'IVF and assisted reproduction' },
        { id: 10, category: 'reproductive', name: 'C-Section Delivery', price: '$3000-8000', duration: '30-60 mins', description: 'Safe surgical delivery' }
    ];

    const categories = [
        { value: 'all', label: t('procedures.all') },
        { value: 'dental', label: t('procedures.dental') },
        { value: 'vision', label: t('procedures.vision') },
        { value: 'orthopedic', label: t('procedures.orthopedic') },
        { value: 'cardiology', label: t('procedures.cardiology') },
        { value: 'reproductive', label: t('procedures.reproductive') }
    ];

    const filteredProcedures = useMemo(() => {
        return procedures.filter(proc => {
            const matchesSearch = proc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                proc.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || proc.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    return (
        <div className="page procedures-page">
            <div className="page-banner">
                <img src={logoPNG} alt="HealUSA Logo" className="page-logo" />
                <p className="page-tagline">{t('global.tagline')}</p>
            </div>
            {/* Hero Section */}
            <section className="page-hero">
                <h1>{t('procedures.title')}</h1>
                <p>{t('procedures.subtitle')}</p>
            </section>

            {/* Search and Filter */}
            <section className="content-section">
                <div className="search-filter-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder={t('procedures.search_placeholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <div className="filter-categories">
                        <label>{t('procedures.filter')}:</label>
                        <div className="category-buttons">
                            {categories.map(cat => (
                                <button
                                    key={cat.value}
                                    className={`filter-btn ${selectedCategory === cat.value ? 'active' : ''}`}
                                    onClick={() => setSelectedCategory(cat.value)}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <p className="results-count">
                    {t('procedures.showing')} {filteredProcedures.length} {t('procedures.results')}
                </p>
            </section>

            {/* Procedures Grid */}
            <section className="content-section">
                {filteredProcedures.length > 0 ? (
                    <div className="procedures-grid">
                        {filteredProcedures.map(proc => (
                            <div key={proc.id} className="procedure-card">
                                <div className="procedure-header">
                                    <h3>{proc.name}</h3>
                                    <span className="procedure-category">{proc.category}</span>
                                </div>
                                <p className="procedure-description">{proc.description}</p>
                                <div className="procedure-details">
                                    <div className="detail">
                                        <span className="label">{t('procedures.price')}:</span>
                                        <span className="value">{proc.price}</span>
                                    </div>
                                    <div className="detail">
                                        <span className="label">{t('procedures.duration')}:</span>
                                        <span className="value">{proc.duration}</span>
                                    </div>
                                </div>
                                <button className="btn btn-sm">{t('procedures.inquiry')}</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-results">
                        <p>{t('procedures.no_results')}</p>
                    </div>
                )}
            </section>
        </div>
    );
}
