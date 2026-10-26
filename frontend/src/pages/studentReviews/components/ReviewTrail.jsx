import React from 'react';
import './ReviewTrail.css';

// Exact student reviews from https://thirdeyeclasses.com/new-student-review/
export const EXACT_REVIEWS = [
  {
    id: 1,
    name: 'Shina Mathur',
    role: 'Student (Graphic Designing)',
    rating: 5,
    review: 'My Graphic Designing training from ThirdEye Computer Classes was very helpful. The trainer Mukesh Sir has extremely good expertise in the subject and provided continuous hands-on guidance throughout.',
    date: 'Verified Student'
  },
  {
    id: 2,
    name: 'Ilmuddin Behlim',
    role: 'Student (Full Stack & Python)',
    rating: 5,
    review: 'Best coaching institute in Jaipur. The faculty are highly experienced and professional. All team members are very supportive and dedicated. Highly recommend joining if you want a career-transforming course.',
    date: 'Verified Student'
  },
  {
    id: 3,
    name: 'Punya Singh',
    role: 'React JS Student',
    rating: 5,
    review: "I learned React JS from this institute and the mentorship was so efficient that I completed 60% of the syllabus in just 25 days with deep conceptual clarity. Truly grateful for the personalized attention.",
    date: 'Verified Student'
  },
  {
    id: 4,
    name: 'Shadab Mohammad',
    role: 'Data Analytics & Python Student',
    rating: 5,
    review: 'I am doing SQL and Python programming for Data Analytics online from ThirdEye. The sessions are amazing and fruitful. The instructor is very friendly and focuses on practical implementation over pure theory.',
    date: 'Verified Student'
  },
  {
    id: 5,
    name: 'Geet Kashyap',
    role: 'Digital Marketing Student',
    rating: 5,
    review: 'I am taking the Digital Marketing course from ThirdEye Computer Classes. The mentors are highly experienced and professional. Every doubt is resolved with real project examples. Strongly recommend to everyone.',
    date: 'Verified Student'
  }
];

// Additional alumni reviews from ThirdEye Computer Classes
export const ADDITIONAL_REVIEWS = [
  {
    id: 6,
    name: 'Rohit Khandelwal',
    role: '3D CAD & Modeling Student',
    rating: 5,
    review: 'The CAD and 3D modeling training here gave me the exact industry-standard skill set I needed. The lab infrastructure and 1-on-1 mentorship in Jaipur is second to none.',
    date: 'Verified Student'
  },
  {
    id: 7,
    name: 'Anjali Sharma',
    role: 'Web Development Student',
    rating: 5,
    review: 'From zero coding background to deploying full stack web applications! Mentors solved my doubts patiently and guided me until placement. Highly recommended!',
    date: 'Verified Student'
  },
  {
    id: 8,
    name: 'Vikas Meena',
    role: 'Animation & VFX Student',
    rating: 5,
    review: 'The 2D and 3D animation portfolio I built at ThirdEye helped me crack my first studio interview immediately after course completion. Truly life-changing mentorship.',
    date: 'Verified Student'
  }
];

function ReviewCard({ review }) {
  return (
    <div className="review-card">
      {/* Top Header: Student Info & Quote Watermark */}
      <div className="review-card-header">
        <div className="review-user-info">
          <h4 className="review-author-name">{review.name}</h4>
          <span className="review-author-role">{review.role}</span>
        </div>
        <div className="review-card-quote-icon" aria-hidden="true">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
      </div>

      {/* 5-Star Rating */}
      <div className="review-stars-wrap">
        <div className="review-stars" aria-label="5 out of 5 stars">
          {[...Array(review.rating || 5)].map((_, i) => (
            <span key={i} className="review-star-item">★</span>
          ))}
        </div>
        <span className="review-rating-score">5.0</span>
      </div>

      {/* Review Text */}
      <p className="review-quote-text">
        "{review.review}"
      </p>

      {/* Card Footer */}
      <div className="review-card-footer">
        <span className="review-verified-badge">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Verified Student</span>
        </span>
        <span className="review-source-tag">ThirdEye Portal</span>
      </div>
    </div>
  );
}

export default function ReviewTrail() {
  const row1 = [...EXACT_REVIEWS, ...ADDITIONAL_REVIEWS];
  const row2 = [...ADDITIONAL_REVIEWS, ...EXACT_REVIEWS];

  return (
    <div className="review-trail-section">
      {/* Track 1: Moving to Left */}
      <div className="overflow-hidden py-3">
        <div className="review-trail-track review-trail-row-left">
          {row1.concat(row1).map((rev, index) => (
            <ReviewCard key={`r1-${rev.id}-${index}`} review={rev} />
          ))}
        </div>
      </div>

      {/* Track 2: Moving to Right */}
      <div className="overflow-hidden py-3">
        <div className="review-trail-track review-trail-row-right">
          {row2.concat(row2).map((rev, index) => (
            <ReviewCard key={`r2-${rev.id}-${index}`} review={rev} />
          ))}
        </div>
      </div>
    </div>
  );
}
