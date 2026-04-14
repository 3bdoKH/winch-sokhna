import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ChevronLeft, Search, X, Filter } from 'lucide-react';
import { areas } from '../../data/areas';
import './ServiceAreas.css';

const ServiceAreas = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeGov, setActiveGov] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "دليل مناطق التغطية | ونش انقاذ السخنة";
  }, []);

  const filteredAreas = useMemo(() => {
    let govList = areas;

    if (activeGov !== 'all') {
      govList = govList.filter(gov => gov.name === activeGov);
    }

    if (!searchQuery.trim()) return govList;

    const q = searchQuery.trim();
    return govList
      .map(gov => ({
        ...gov,
        areas: gov.areas.filter(area => area.includes(q))
      }))
      .filter(gov => gov.areas.length > 0 || gov.name.includes(q));
  }, [searchQuery, activeGov]);

  const totalResults = filteredAreas.reduce((sum, gov) => sum + gov.areas.length, 0);

  const clearSearch = () => {
    setSearchQuery('');
    setActiveGov('all');
  };

  return (
    <div className="page-wrapper bg-light">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">مناطق التغطية لخدماتنا</h1>
          <p className="page-breadcrumb">
            <Link to="/">الرئيسية</Link> / <span>مناطق التغطية</span>
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">نحن بالقرب منك دائماً</h2>
            <p className="section-subtitle">
              نقدم خدمات الإنقاذ وقطر السيارات في شبكة واسعة من المحافظات والمدن، اختر منطقتك لمعرفة التفاصيل والاتصال.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="search-filter-bar">
            <div className="search-input-wrapper">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="ابحث عن منطقتك... (مثال: المعادي، الشروق)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                dir="rtl"
              />
              {searchQuery && (
                <button className="search-clear" onClick={() => setSearchQuery('')} aria-label="مسح البحث">
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Results counter */}
            {(searchQuery || activeGov !== 'all') && (
              <div className="results-info">
                <span className="results-count">
                  {totalResults > 0
                    ? `عرض ${totalResults} منطقة`
                    : 'لا توجد نتائج'}
                </span>
                <button className="clear-filters-btn" onClick={clearSearch}>
                  <X size={14} />
                  مسح الفلتر
                </button>
              </div>
            )}
          </div>

          {/* Governorate Filter Tabs */}
          <div className="gov-filter-tabs">
            <Filter size={18} className="filter-label-icon" />
            <div className="gov-tabs-scroll">
              <button
                className={`gov-tab ${activeGov === 'all' ? 'active' : ''}`}
                onClick={() => setActiveGov('all')}
              >
                جميع المحافظات
              </button>
              {areas.map((gov, i) => (
                <button
                  key={i}
                  className={`gov-tab ${activeGov === gov.name ? 'active' : ''}`}
                  onClick={() => setActiveGov(gov.name)}
                >
                  {gov.name}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {filteredAreas.length === 0 ? (
            <div className="no-results">
              <Search size={48} />
              <h3>لا توجد نتائج</h3>
              <p>لم نجد مناطق تطابق بحثك "<strong>{searchQuery}</strong>"</p>
              <button className="btn-primary" onClick={clearSearch}>عرض جميع المناطق</button>
            </div>
          ) : (
            <div className="governorates-list">
              {filteredAreas.map((gov, index) => (
                <div key={index} className="governorate-card">
                  <h3 className="governorate-title">
                    <MapPin size={24} className="gov-icon" />
                    محافظة {gov.name}
                    <span className="gov-area-count">{gov.areas.length} منطقة</span>
                  </h3>
                  <ul className="areas-list">
                    {gov.areas.map((area, idx) => (
                      <li key={idx}>
                        <Link to={`/areas/${encodeURIComponent(area)}`} className="area-link">
                          <ChevronLeft size={16} />
                          ونش انقاذ {area}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ServiceAreas;
