import React from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../../data/testimonials';
import './Testimonials.css';

const Testimonials = () => {
  return (
    <section className="testimonials section bg-light">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">آراء <span className="highlight">عملائنا</span></h2>
          <p className="section-subtitle">
            نفخر بثقة عملائنا في خدماتنا، وهذا ما يقولونه عن تجربتهم معنا.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map(item => (
            <div key={item.id} className="testimonial-card">
              <Quote className="quote-icon" size={40} />
              
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="var(--primary)" color="var(--primary)" />
                ))}
              </div>
              
              <p className="review-text">"{item.review}"</p>
              
              <div className="client-info">
                <div className="client-avatar">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="client-name">{item.name}</h4>
                  <span className="client-role">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
