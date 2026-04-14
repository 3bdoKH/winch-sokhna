import React from 'react';
import { Users, Truck, Clock, Award } from 'lucide-react';
import './Stats.css';

const Stats = () => {
  const statsList = [
    {
      id: 1,
      icon: <Truck size={36} />,
      number: '15,000+',
      title: 'عملية إنقاذ ناجحة'
    },
    {
      id: 2,
      icon: <Users size={36} />,
      number: '12,000+',
      title: 'عميل سعيد'
    },
    {
      id: 3,
      icon: <Clock size={36} />,
      number: '20 دقيقة',
      title: 'متوسط زمن الوصول'
    },
    {
      id: 4,
      icon: <Award size={36} />,
      number: '15+',
      title: 'سنوات من الخبرة'
    }
  ];

  return (
    <section className="stats-section section">
      <div className="container">
        <div className="stats-grid">
          {statsList.map(stat => (
            <div key={stat.id} className="stat-card">
              <div className="stat-icon">
                {stat.icon}
              </div>
              <h3 className="stat-number">{stat.number}</h3>
              <p className="stat-title">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
